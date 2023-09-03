const input = document.getElementById("input");
const btn = document.getElementById("btn");
const region = document.getElementById("region");
const degree = document.getElementById("degree");
const image = document.getElementById("condition");
const humidityDiv = document.querySelector(".humidity");
const windDiv = document.querySelector(".windDiv");
btn.addEventListener("click", () => {
  fetch(
    `http://api.weatherapi.com/v1/current.json?key=536f3380957746d0984170823232407&q=${input.value}&aqi=no`
  )
    .then((res) => res.json())
    .then((data) => {
      windDiv.innerHTML = "";
      humidityDiv.innerHTML = "";
      region.innerHTML =
        data.location.region + `<i class="fa-solid fa-location-dot"></i>`;
      degree.innerHTML = data.current.temp_c + "°C";
      if (data.current.condition.text === "Clear") {
        image.setAttribute(
          "src",
          `images/${data.current.condition.text.toLowerCase() + ".png"}`
        );
      } else if (data.current.condition.text === "Partly cloudy") {
        image.setAttribute("src", "images/clouds.png");
      } else if (data.current.condition.text === "Sunny") {
        image.setAttribute("src", `images/clear.png`);
      } else if (data.current.condition.text == "Patchy rain possible") {
        image.setAttribute("src", `images/drizzle.png`);
      } else if (data.current.condition.text == "Light rain") {
        image.setAttribute("src", `images/rain.png`);
      } else if (data.current.condition.text == "Thundery outbreaks possible") {
        image.setAttribute("src", `images/wind.png`);
      }
      let image1 = document.createElement("img");
      image1.setAttribute("src", "images/humidity.png");
      image1.classList.add("image");
      let image2 = document.createElement("img");
      image2.setAttribute("src", "images/wind.png");
      image2.classList.add("image");
      let windSpeed = document.createElement("span");
      windSpeed.innerHTML = "Wind speed: <br>" + data.current.wind_kph + "km/h";
      windSpeed.classList.add("windSpeed");
      let humidity = document.createElement("span");
      humidity.innerHTML = "Humidity: <br>" + data.current.humidity + "%";
      humidity.classList.add("windSpeed");
      humidityDiv.append(image1, humidity);
      windDiv.append(image2, windSpeed);
      console.log(data);
      console.log(data.current.condition.text);
    })
    .catch((err) => console.log(err));
});
