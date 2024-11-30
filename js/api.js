
const geoSuccess = (pos) => {
   let lat = pos.coords.latitude
   let lon = pos.coords.longitude
   const apiOpenWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=570b464168922cfe5ecbd90b16266f82&units=metric`
   fetch(apiOpenWeather)
      .then(response => response.json())
      .then(data => {
         let climaDiv = document.getElementById("clima")
         let climaDivInfo = document.createElement('div')
         climaDivInfo.innerHTML = `<p>Ciudad: ${data.name}</p>
                                    <p>Temperatura: ${Math.round(data.main.temp)}°C</p>
                                    <p>Sensación térmica: ${Math.round(data.main.feels_like)}°C</p>`
         climaDiv.append(climaDivInfo)
      })
      .catch(error=>{
         throw(error)
      })
}

const geoError = () => {
   console.error("Ubicacion no está soportado en el browser o se rechazaron los permisos.")
}

try {
   if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(geoSuccess,geoError)
   }else{
      alert("Geolocation no esta soportado")
   }
} catch (error) {
   console.error(error)
}
