const input = document.querySelector('input')
const button = document.querySelector('button')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')


const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = '&appid=7e472f062b64436c7398309111504f89'
const API_UNITS = '&units=metric'

const getWeather=()=>{
    const city = input.value || 'Kijów'
    const URL = API_LINK + city + API_KEY + API_UNITS

    axios.get(URL).then(res=>{
        //console.log(res.data)

        const temp = res.data.main.temp
        const hum = res.data.main.humidity
        const status = Object.assign({}, ...res.data.weather)

        cityName.textContent = res.data.name

        temperature.textContent = Math.floor(temp )+'°C'
        humidity.textContent = hum + '%'
        weather.textContent = status.main

        warning.textContent=''

  
    if(status.id>=200 && status.id<300 ){
        photo.setAttribute('src','./img/thunderstorm.png')
    }else if(status.id>=300 && status.id<400 ){
        photo.setAttribute('src', './img/drizzle.png')
    }else if(status.id>=500 && status.id<600 ){
        photo.setAttribute('src', './img/rain.png')
    }else if(status.id>=600 && status.id<700 ){
        photo.setAttribute('src', './img/ice.png')
    }else if(status.id>=700 && status.id<800 ){
        photo.setAttribute('src', './img/fog.png')
    }
    else if(status.id===800){
        photo.setAttribute('src', './img/sun.png')
    }else if(status.id>800 && status.id<900 ){
        photo.setAttribute('src', './img/cloud.png')
    }else{
        photo.setAttribute('src', './img/unknown.png')
   }  

    }).catch(()=>warning.textContent="Wpisz poprawną nazwę miasta")
}


getWeather()

const getEnter=(e)=>{
    if(e.key==='Enter'){
       getWeather()

    }
}

const getDayToday=()=>{
    const day =new Date()
    const toDay= day.getDate()
    const dayMonth = day.toLocaleString('pl',{month:'long'})
    const dayYear = day.getFullYear()
    const dayWeek = day.toLocaleString('pl',{weekday: 'long' })
    const a = dayWeek.split('')
    const y = a[0].toLocaleUpperCase()
    const x = a.slice(1, dayWeek.length).join('')
    const d = y+x
    const today = document.querySelector('.today')
    today.textContent=d+","+" "+toDay+" "+dayMonth
    
    console.log(toDay)
}

getDayToday()

button.addEventListener('click',getWeather)
document.addEventListener('keyup',getEnter)

