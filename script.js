
const addNewWeather = (temp, feelsLike, humi, windSpeed, visi, wether, city, id) => {

    const d = new Date();

    const day = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ];

    const fullDate = `${day[d.getDay()]} ,  ${d.getFullYear()} / ${d.getMonth()} / ${d.getDay()}`;

    const tempToCels = Math.round((temp - 32) * 0.5556);

    let icon;

    if(wether === `Clear`) {
         icon = `<img src="./icons/sun.png" />`;
    } else if (wether === `Clouds`){
         icon = `<img src="./icons/cloudy.png" />`;
    }

    const div = `
    <div class="weather-box">
    <button class="options-btn btn${id}">
        <span class="material-symbols-outlined">
        more_vert
        </span>
    </button>
    <div class="option-modal modal${id}">
    <button class="remove-box">Remove</button>
    </div>
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
        <h1>${tempToCels}<sup>C</sup></h1>
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


        $(`.btn${id}`).click( (event) => {
            $(`.modal${id}`).toggle();
            const parent = event.currentTarget.parentElement;
            $(`.remove-box`).click( () => {

                let data = localStorage.getItem(`weather-list`);
                data = JSON.parse(data);
                function checkID(e){
                        return e.id === id;
                    }
                    const index = data.findIndex(checkID);
                const newData = data.filter( (e) => {
                    if(e.id !== data[index].id){
                        return e;
                    };
                });


                localStorage.setItem(`weather-list`, JSON.stringify(newData));
                parent.remove();

                location.reload();

            })
        });

  
    
};


const getWeather = async (lon, lat, city, id) => {
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
    addNewWeather( temp, feelsLike, humi, windSpeed, visi, wether, city, id);
};

const getLocation = async (city, id) => {
    const APIkey = `b48f8d17db2c7e8becb6cc27a2e1c362`;
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIkey}`;
    const respons = await fetch (url);
    const result = await respons.json();
    const lon = result[0].lon;
    const lat = result[0].lat;
    getWeather(lon, lat, city, id);
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
    const id = Math.round(Math.random() * 100000);
    addStorage(id, value);
    getLocation(value, id);
    $(`.modal-box`).hide();
});


const addStorage = (id, city) => {
    let data = localStorage.getItem(`weather-list`);
    data = JSON.parse(data);
        const list = { id: id, city: city};
    if(data !== null){
        data.push(list);
    } else {
        data = [ list ];
    }
    localStorage.setItem(`weather-list`, JSON.stringify(data));
};

const getStorage = () => {
    let data = localStorage.getItem(`weather-list`);
    data = JSON.parse(data);
    if(data !== null){
        for(let i = 0; i < data.length; i++){
            getLocation(data[i].city, data[i].id);
        }
    }
}

getStorage();