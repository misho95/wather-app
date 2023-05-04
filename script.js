
const addNewWeather = (temp, feelsLike, humi, windSpeed, visi, wether, city) => {

    const d = new Date();

    const day = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ];

    const fullDate = `${day[d.getDay()]} ,  ${d.getFullYear()} / ${d.getMonth()} / ${d.getDay()}`;

    const icon = `<img src="./icons/sun.png" />`;

    const div = `
    <div class="weather-box">
    <button class="options-btn">
        <span class="material-symbols-outlined">
        more_vert
        </span>
    </button>
    <header class="weather-header">
        <div class="wh-left">
            ${icon}
        </div>
        <div class="wh-right">
            <div>${city}</div>
            <div>${fullDate}</div>
        </div>
    </header>
    <section class="weather-section">
        <h1>${temp}<sup>C</sup></h1>
        <p>Mostly ${wether}</p>
    </section>
    <footer class="weather-footer">
        <div>visibility ${visi}</div>
        <div>feels like ${feelsLike}</div>
        <div>humidity ${humi}</div>
        <div>wind ${windSpeed}</div>
    </footer>
</div>
    `;

    $(`.add-weather`).before(div);
};


const getWeather = async (lon, lat, city) => {
    const APIkey = `b48f8d17db2c7e8becb6cc27a2e1c362`;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`;
    const respons = await fetch (url);
    const result = await respons.json();
    const feelsLike = result.main.feels_like;
    const temp = result.main.temp;
    const humi = result.main.humidity;
    const windSpeed = result.wind.speed;
    const visi = result.visibility;
    const wether = result.weather[0].main;
    addNewWeather( temp, feelsLike, humi, windSpeed, visi, wether,city);
};

const getLocation = async (city) => {
    const APIkey = `b48f8d17db2c7e8becb6cc27a2e1c362`;
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIkey}`;
    const respons = await fetch (url);
    const result = await respons.json();
    const lon = result[0].lon;
    const lat = result[0].lat;
    getWeather(lon, lat, city);
}

$(`.add-weather`).click( () => {
    $(`.modal-box`).show();
});

$(`#close-btn`).click( () => {
    $(`.modal-box`).hide();
});

$(`#add-w-btn`).click( (e) => {
    e.preventDefault();
    let value = $(`.select-option`).val();
    getLocation(value);
    $(`.modal-box`).hide();
});
