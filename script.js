
const getLocation = async (city) => {
    const cityName = city;
    const APIkey = `b48f8d17db2c7e8becb6cc27a2e1c362`;
    const respons = await fetch `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${APIkey}`;
    const result = await respons.json();
    console.log(result);
}

// getLocation(`London`);



$(`.add-weather`).click( () => {
    $(`.modal-box`).show();
});

$(`#close-btn`).click( () => {
    $(`.modal-box`).hide();
});

$(`#add-w-btn`).click( (e) => {
    e.preventDefault()
    let value = $(`.select-option`).val();
        addNewWeather(value);
    $(`.modal-box`).hide();
});

const addNewWeather = (city) => {

    const div = `
    <div class="weather-box">
    <button class="options-btn">
        <span class="material-symbols-outlined">
        more_vert
        </span>
    </button>
    <header class="weather-header">
        <div class="wh-left">
            <img src="./icons/sun.png" />
        </div>
        <div class="wh-right">
            <div>${city}</div>
            <div>Monday 01/17/2023</div>
        </div>
    </header>
    <section class="weather-section">
        <h1>15<sup>C</sup></h1>
        <p>Mostly cloudy</p>
    </section>
    <footer class="weather-footer">
        <div>visibility 10km</div>
        <div>feels like 10km</div>
        <div>humidity 10km</div>
        <div>wind 10km</div>
    </footer>
</div>
    `;

    $(`.add-weather`).before(div);
}