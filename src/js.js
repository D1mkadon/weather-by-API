let cities = document.querySelectorAll(".city")
let divWeather = document.querySelectorAll(".weather")
let divIcons = document.querySelectorAll(".icon")
let arrowDown = document.querySelectorAll(".gg-arrow-long-down");
let description1 = document.querySelectorAll(".description");
let Wspeed = document.querySelectorAll(".Wspeed");
let WDirection = document.querySelectorAll(".WDirection");
let Pressure = document.querySelectorAll(".Pressure");
let sunrise = document.querySelectorAll(".sunrise");
let sunset = document.querySelectorAll(".sunset");
let ARROW = document.querySelectorAll(".icon-arrow-up");
for(let i = 0; i<arrowDown.length; i++){
    description1[i].style.display = "none";
    arrowDown[i].addEventListener("mouseenter", function(event){
        event.target.color = "black"
        if(description1[i].style.display == "none"){description1[i].style.display = "flex";}
    })
    arrowDown[i].addEventListener("mouseover", function(event){
       
        if(description1[i].style.display == "flex"){
            setTimeout(function() {
                event.target.color = ""
                description1[i].style.display = "none";
              }, 100);
           }
    })
}


let url = ["http://api.openweathermap.org/data/2.5/weather?id=703448&appid=bf35cac91880cb98375230fb443a116f", "http://api.openweathermap.org/data/2.5/weather?id=2643743&appid=bf35cac91880cb98375230fb443a116f",
"http://api.openweathermap.org/data/2.5/weather?id=5128638&appid=bf35cac91880cb98375230fb443a116f"];
for (let i=0; i<url.length;i++){
   let thisUrl = url[i];
   fetch(thisUrl).then(response => response.json())
   .then(json => {
      let deg = json.wind.deg;
      cities[i].innerHTML += "<br>City: " +json.name;
      divWeather[i].innerHTML += "<br>Weather: " +json.weather[0].description;
      divWeather[i].innerHTML += "<br>"+ +(json.main.temp-273.15).toFixed(1) +"°C";
      divIcons[i].innerHTML += '<img src=http://openweathermap.org/img/wn/'+json.weather[0].icon+'@2x.png>'
      Wspeed[i].innerHTML += "<br>" +json.wind.speed +"m/s"
      // WDirection[i].innerHTML += "<br>" +json.wind.deg +"deg"
      Pressure[i].innerHTML += "<br>" +json.main.pressure + "hPa"
      var tr = new Date (json.sys.sunrise*1000).toLocaleTimeString("en-US",{hour12: false})
      sunrise[i].innerHTML += "<br>" +tr
      var ts = new Date (json.sys.sunset*1000).toLocaleTimeString("en-EN",{hour12: false})
      sunset[i].innerHTML += "<br>" +ts
      ARROW[i].style = `transform: rotate(${deg+"deg"})`
   })
}
let slider = document.querySelector('#slider')
slider.addEventListener("change", function(){
   if(this.checked) {
      for (let i=0; i<url.length;i++){
         let thisUrl = url[i];
         fetch(thisUrl).then(response => response.json())
         .then(json => {
            divWeather[i].innerHTML = "";
            divWeather[i].innerHTML += "<br>Weather: " +json.weather[0].description;
            divWeather[i].innerHTML += "<br>"+ +(json.main.temp).toFixed(1) + "°F";
         })
      }
   }
   else {
      for (let i=0; i<url.length;i++){
         let thisUrl = url[i];
         fetch(thisUrl).then(response => response.json())
         .then(json => {
            divWeather[i].innerHTML = "";
            divWeather[i].innerHTML += "<br>Weather: " +json.weather[0].description;
            divWeather[i].innerHTML += "<br>"+ +(json.main.temp-273.15).toFixed(1) +"°C";
         })
      }
   }
})
