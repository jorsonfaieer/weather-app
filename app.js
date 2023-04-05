const container = document.querySelector("#container");
const searchBox = document.querySelector("#searchBox");
const notFound = document.querySelector("#notFound");
const weatherBox = document.querySelector("#weatherBox");
const weatherDetails = document.querySelector("#weatherDetails");
const imageWeather = document.querySelector('#imageWeather');
const temperature = document.querySelector('#temperature');
const termica = document.querySelector('#termica');
const description = document.querySelector('#description');
const humidity = document.querySelector('#humidity');
const wind = document.querySelector('#wind');
const APIKEY = "33b8ead125e99a914705f8ef9196a2b2";

const buscarLugar = () => {
  const city = document.querySelector("#input").value.trim();

  if (city == "") {
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`)
    .then(response => response.json())
    .then(data => {

      if(data.cod == 404){
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        notFound.style.display = 'block';
        return;
      }

      notFound.style.display = 'none';

      switch (data.weather[0].main) {
        case 'Clear':
          imageWeather.src = 'src/sun-with-rays.svg';
          description.innerHTML = `Despejado`;
          break;

        case 'Rain':
          imageWeather.src = 'src/cloud-with-rain.svg';
          description.innerHTML = `Lluvia`;
          break;

        case 'Snow':
          imageWeather.src = 'src/cloud-with-snow.svg';
          description.innerHTML = `Nieve`;
          break;

        case 'Clouds':
          imageWeather.src = 'src/cloud.svg';
          description.innerHTML = `Nublado`;
          break;
        
        case 'Mist':
          imageWeather.src = 'src/extreme-haze.svg';
          description.innerHTML = `Neblina`;
          break;
        
        default: 
          imageWeather.src = '';        
      }

      temperature.innerHTML = `Temperatura: <span class="font-bold">${data.main.temp}°C</span>`;
      termica.innerHTML = `Sensación térmica: <span class="font-bold">${data.main.feels_like}°C</span>`
      humidity.innerHTML = `${data.main.humidity}%`;
      wind.innerHTML = `${parseInt(data.wind.speed)}Km/h`;

      weatherBox.style.display = 'block';
      weatherDetails.style.display = 'flex';

    });
}

searchBox.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
    buscarLugar();
  }
});

searchBox.addEventListener("click", ()=>{ buscarLugar();});