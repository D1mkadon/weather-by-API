"use strict";

var cities = document.querySelectorAll(".city");
var divWeather = document.querySelectorAll(".weather");
var divIcons = document.querySelectorAll(".icon");
var arrowDown = document.querySelectorAll(".gg-arrow-long-down");
var description1 = document.querySelectorAll(".description");
var Wspeed = document.querySelectorAll(".Wspeed");
var WDirection = document.querySelectorAll(".WDirection");
var Pressure = document.querySelectorAll(".Pressure");
var sunrise = document.querySelectorAll(".sunrise");
var sunset = document.querySelectorAll(".sunset");
var ARROW = document.querySelectorAll(".icon-arrow-up");

var _loop = function _loop(i) {
  description1[i].style.display = "none";
  arrowDown[i].addEventListener("mouseenter", function (event) {
    event.target.color = "black";

    if (description1[i].style.display == "none") {
      description1[i].style.display = "flex";
    }
  });
  arrowDown[i].addEventListener("mouseover", function (event) {
    if (description1[i].style.display == "flex") {
      setTimeout(function () {
        event.target.color = "";
        description1[i].style.display = "none";
      }, 100);
    }
  });
};

for (var i = 0; i < arrowDown.length; i++) {
  _loop(i);
}

var url = ["http://api.openweathermap.org/data/2.5/weather?id=703448&appid=bf35cac91880cb98375230fb443a116f", "http://api.openweathermap.org/data/2.5/weather?id=2643743&appid=bf35cac91880cb98375230fb443a116f", "http://api.openweathermap.org/data/2.5/weather?id=5128638&appid=bf35cac91880cb98375230fb443a116f"];

var _loop2 = function _loop2(_i) {
  var thisUrl = url[_i];
  fetch(thisUrl).then(function (response) {
    return response.json();
  }).then(function (json) {
    var deg = json.wind.deg;
    cities[_i].innerHTML += "<br>City: " + json.name;
    divWeather[_i].innerHTML += "<br>Weather: " + json.weather[0].description;
    divWeather[_i].innerHTML += "<br>" + +(json.main.temp - 273.15).toFixed(1) + "°C";
    divIcons[_i].innerHTML += '<img src=http://openweathermap.org/img/wn/' + json.weather[0].icon + '@2x.png>';
    Wspeed[_i].innerHTML += "<br>" + json.wind.speed + "m/s"; // WDirection[i].innerHTML += "<br>" +json.wind.deg +"deg"

    Pressure[_i].innerHTML += "<br>" + json.main.pressure + "hPa";
    var tr = new Date(json.sys.sunrise * 1000).toLocaleTimeString("en-US", {
      hour12: false
    });
    sunrise[_i].innerHTML += "<br>" + tr;
    var ts = new Date(json.sys.sunset * 1000).toLocaleTimeString("en-EN", {
      hour12: false
    });
    sunset[_i].innerHTML += "<br>" + ts;
    ARROW[_i].style = "transform: rotate(".concat(deg + "deg", ")");
  });
};

for (var _i = 0; _i < url.length; _i++) {
  _loop2(_i);
}

var slider = document.querySelector('#slider');
slider.addEventListener("change", function () {
  if (this.checked) {
    var _loop3 = function _loop3(_i2) {
      var thisUrl = url[_i2];
      fetch(thisUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        divWeather[_i2].innerHTML = "";
        divWeather[_i2].innerHTML += "<br>Weather: " + json.weather[0].description;
        divWeather[_i2].innerHTML += "<br>" + +json.main.temp.toFixed(1) + "°F";
      });
    };

    for (var _i2 = 0; _i2 < url.length; _i2++) {
      _loop3(_i2);
    }
  } else {
    var _loop4 = function _loop4(_i3) {
      var thisUrl = url[_i3];
      fetch(thisUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        divWeather[_i3].innerHTML = "";
        divWeather[_i3].innerHTML += "<br>Weather: " + json.weather[0].description;
        divWeather[_i3].innerHTML += "<br>" + +(json.main.temp - 273.15).toFixed(1) + "°C";
      });
    };

    for (var _i3 = 0; _i3 < url.length; _i3++) {
      _loop4(_i3);
    }
  }
});