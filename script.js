const city = document.querySelector(".city");
const weatherDiv = document.querySelector(".icon");
const weatherIcon = document.querySelector(".icon-display");
const celcius = document.querySelector(".celcius");
const humidityP = document.querySelector(".humidity");
const pressureP = document.querySelector(".pressure");
const descriptionP = document.querySelector(".description");
const url = 'https://api.openweathermap.org/data/2.5/';
const key = '9d943ace219961715f2e02e94dd8da67';
const inputCity = document.querySelector("#cityinput");
const buton = document.querySelector(".buton");



let lat;
let long;


//Oldugumuz sehrin koordinatlarini alma
window.addEventListener("load", () => {
    navigator.geolocation.getCurrentPosition((position) => {
        lat = position.coords.latitude;
        //console.log(paralel);
        long = position.coords.longitude;
        getData();
    });

});


//inputtan enter la sehir ismini alma
(e) => {
    if (e.keyCode == '13')
        console.log(inputCity.value);

}

cityname = "Körfez";

//inputCity.addEventListener('keyup', cityname);

//Sehir, sicaklik,nem, basinc degerlerini alma
async function getData() {
    const data = await fetch(`${url}weather?q=${cityname}&appid=${key}`);
    const result = await data.json();
    console.log(result);
    const { humidity, pressure, temp, name } = result.main;
    city.textContent = result.name;
    celcius.textContent = Math.round((temp - 273.15)) + "°";
    humidityP.textContent = "Humidity : " + humidity + "%";
    pressureP.textContent = "Pressure : " + pressure;
    const { icon, description } = result.weather[0];
    const desc = description.split(" ");
    for (let i = 0; i < desc.length; i++) {
        desc[i] = desc[i][0].toUpperCase() + desc[i].substr(1);
    }
    console.log(desc.join(' '));
    descriptionP.textContent = "Description : " + desc.join(' ');

    console.log(icon);
    //hava durumunu belli eden iconu almma
    // weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;



}

var cities = [
    { name: 'Körfez', utc: '+3' }
];



//yerel saat
function setTimes() {
    var date = new Date();

    var hours = (date.getUTCHours() > 11) ? date.getUTCHours() - 12 + parseInt(cities[0].utc, 10) : date.getUTCHours() + parseInt(cities[0].utc, 10);

    cities[0].hours = (hours / 12) * 360;
    console.log("saat" + cities[0].hours);
    cities[0].minoutes = (date.getUTCMinutes() / 60) * 360;
    console.log("dakika" + cities[0].minoutes);


}
setTimes()
const saat = document.querySelector(".hour");
console.log(saat);
const dakika = document.querySelector(".min");

//saati akrep ve yelkovana aktar
function update() {

    saat.style.transform = "rotate(" + cities[0].hours + "deg)";
    dakika.style.transform = 'rotate(' + cities[0].minoutes + 'deg)';
}
update();






