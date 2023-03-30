const gettingCityName = document.querySelector("#gettingCtyName")! as HTMLInputElement;
const btn_search = document.querySelector(".btn-search")!;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '7165a5b0aemshafbf23772f9625ep13f972jsn53e610ff91e2',
		'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
	}
};
class City {
	constructor(public city: String, public temp: number, public sunset: number, public sunrise: number, public windSpeed: number) {

	}
}
let cities = ["Karachi", "Lahore", "Islamabad", "Peshawar"]

let table: HTMLTableElement = <HTMLTableElement>document.querySelector(".table")
const showData = () => {
	Promise.all(cities.map((city) => {
		return fetch(`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`, options)
			.then((response) => {
				return response.json();
			})
	}))
		.then(results => {
			let row1: HTMLTableRowElement = table.insertRow(2)
			let row2: HTMLTableRowElement = table.insertRow(2)
			let row3: HTMLTableRowElement = table.insertRow(2)
			let row4: HTMLTableRowElement = table.insertRow(2)
			let rows: HTMLTableRowElement[] = [];
			rows.push(row1, row2, row3, row4)
			type tdElements = [HTMLTableCellElement, HTMLTableCellElement, HTMLTableCellElement, HTMLTableCellElement, HTMLTableCellElement]
			rows.map((row, i) => {
				let a: tdElements = [row.insertCell(0), row.insertCell(1), row.insertCell(2), row.insertCell(3), row.insertCell(4)];
				a.forEach((tdElement) => {
					tdElement.classList.add("td")
				})
				a[0].innerHTML = cities[i];
				a[1].innerHTML = results[i].temp
				a[2].innerHTML = results[i].sunset
				a[3].innerHTML = results[i].sunrise
				a[4].innerHTML = results[i].wind_speed
			})
			console.log(results);
		})
		.catch(error => {
			console.error(error);
		});

}

showData()

console.log(table.rows.length);


const onClickHandleWeather = async () => {
	if (gettingCityName.value != "") {
		cities.push(gettingCityName.value)

		await fetch(`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${gettingCityName.value}`, options)
			.then(res => res.json())
			.then((res) => {
				let row = table.insertRow(1)
				type tdElements = [HTMLTableCellElement, HTMLTableCellElement, HTMLTableCellElement, HTMLTableCellElement, HTMLTableCellElement]
				let tdElems: tdElements = [row.insertCell(0), row.insertCell(1), row.insertCell(2), row.insertCell(3), row.insertCell(4)];
				console.log(tdElems);
				tdElems.forEach((tdElement) => {
					tdElement.classList.add("td")
				})
				let city = new City(gettingCityName.value, res.temp, res.sunset, res.sunrise, res.wind_speed)
				console.log(city);

				tdElems[0].innerHTML = `${city.city}`
				tdElems[1].innerHTML = `${city.temp}`
				tdElems[2].innerHTML = `${city.sunset}`
				tdElems[3].innerHTML = `${city.sunrise}`
				tdElems[4].innerHTML = `${city.windSpeed}`
				gettingCityName.value = ""
				return console.log(res)
			})
			.catch(err => console.error(err));
	} else {
		alert("Please write City Name")
	}

}
btn_search.addEventListener("click", onClickHandleWeather)





