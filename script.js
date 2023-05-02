const data = async () => {
  const respons = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&current_weather=true`);
  const data = await respons.json();

    $(`.temperature`).html(`ტემპერატურა: ${data.current_weather.temperature}`);
    $(`.wind`).html(`ქარის სიჩქარე: ${data.current_weather.windspeed}`);
    $(`.elevation`).html(`სიმაღლე წყლის დონიდან: ${data.elevation} მეტრი.`);
}

data();