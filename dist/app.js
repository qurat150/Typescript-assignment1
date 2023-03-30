"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const gettingCityName = document.querySelector("#gettingCtyName");
const btn_search = document.querySelector(".btn-search");
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '7165a5b0aemshafbf23772f9625ep13f972jsn53e610ff91e2',
        'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
};
class City {
    constructor(city, temp, sunset, sunrise, windSpeed) {
        this.city = city;
        this.temp = temp;
        this.sunset = sunset;
        this.sunrise = sunrise;
        this.windSpeed = windSpeed;
    }
}
let cities = ["Karachi", "Lahore", "Islamabad", "Peshawar"];
let table = document.querySelector(".table");
const showData = () => {
    Promise.all(cities.map((city) => {
        return fetch(`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`, options)
            .then((response) => {
            return response.json();
        });
    }))
        .then(results => {
        let row1 = table.insertRow(2);
        let row2 = table.insertRow(2);
        let row3 = table.insertRow(2);
        let row4 = table.insertRow(2);
        let rows = [];
        rows.push(row1, row2, row3, row4);
        rows.map((row, i) => {
            let a = [row.insertCell(0), row.insertCell(1), row.insertCell(2), row.insertCell(3), row.insertCell(4)];
            a.forEach((tdElement) => {
                tdElement.classList.add("td");
            });
            a[0].innerHTML = cities[i];
            a[1].innerHTML = results[i].temp;
            a[2].innerHTML = results[i].sunset;
            a[3].innerHTML = results[i].sunrise;
            a[4].innerHTML = results[i].wind_speed;
        });
        console.log(results);
    })
        .catch(error => {
        console.error(error);
    });
};
showData();
console.log(table.rows.length);
const onClickHandleWeather = () => __awaiter(void 0, void 0, void 0, function* () {
    if (gettingCityName.value != "") {
        cities.push(gettingCityName.value);
        yield fetch(`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${gettingCityName.value}`, options)
            .then(res => res.json())
            .then((res) => {
            let row = table.insertRow(1);
            let tdElems = [row.insertCell(0), row.insertCell(1), row.insertCell(2), row.insertCell(3), row.insertCell(4)];
            console.log(tdElems);
            tdElems.forEach((tdElement) => {
                tdElement.classList.add("td");
            });
            let city = new City(gettingCityName.value, res.temp, res.sunset, res.sunrise, res.wind_speed);
            console.log(city);
            tdElems[0].innerHTML = `${city.city}`;
            tdElems[1].innerHTML = `${city.temp}`;
            tdElems[2].innerHTML = `${city.sunset}`;
            tdElems[3].innerHTML = `${city.sunrise}`;
            tdElems[4].innerHTML = `${city.windSpeed}`;
            gettingCityName.value = "";
            return console.log(res);
        })
            .catch(err => console.error(err));
    }
    else {
        alert("Please write City Name");
    }
});
btn_search.addEventListener("click", onClickHandleWeather);
//# sourceMappingURL=app.js.map