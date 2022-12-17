/*API request */


const apiKey= "6b0d234c6ae22b0041528ecd7a6d81b9";

const card = document.querySelector('.card');
const cityElement = document.querySelector('.city');
const tempElement = document.querySelector('.temp');
const iconTempElement = document.querySelector('.icon-temp');
const descriptionElement = document.querySelector('.temp-description');
const humidityElement = document.querySelector('.humidity');
const windElement = document.querySelector('.wind');

const loader = document.getElementById('preloader');

window.addEventListener('load', () => {
    loader.style.display = 'none';
});

async function fetchData(city){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    const data = response.json();
    return data;
}

const loadData = async (data) => {
    try {

        const datos = await fetchData(data);
        const city = datos.name;
        const temp = `${Math.round(datos.main.temp)}° C`;
        const icon = datos.weather[0].icon;
        const descr = datos.weather[0].description;
        const humidity = `Humidity: ${datos.main.humidity}%`;
        const wind = `Wind Speed: ${datos.wind.speed} km/h`;

        cityElement.innerHTML = city;
        tempElement.innerText = temp;
        iconTempElement.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        descriptionElement.innerText = descr;
        humidityElement.innerText = humidity;
        windElement.innerText = wind;

        const weatherBox = document.querySelector('.weather');
        weatherBox.classList.remove('loading');

        document.body.style.backgroundImage = `url(https://source.unsplash.com/1600x900?${city})`
        
    } catch (error) {
        console.log(error);
    } 
};



/*Search function */
const searchSubmit = document.querySelector('.search-box button');
const search = document.querySelector('.search-bar');
const inputValue = document.querySelector('.search-bar');

searchSubmit.addEventListener('click', () => {
    loadData(inputValue.value);
    search.value = ''
}); 

search.addEventListener('keyup', (e) => {
    if(e.key === 'Enter'){
        loadData(inputValue.value);
        search.value = '';
    }
});

loadData('San Juan');
