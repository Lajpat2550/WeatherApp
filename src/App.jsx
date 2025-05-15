import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState('')
  const [inputCity, setInputCity] = useState('Tokyo')
  const [temp, setTemp] = useState(0)
  const [weather, setWeather] = useState('')
  const [icon, setIcon] = useState('👋')
  const [fetchData, setFetchData] = useState(false)
  let today = new Date()
  let api
  useEffect(() => {
    api = fetch(`https://wttr.in/${city}?format=j1`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        let current = data.current_condition[0]
        setTemp(current.temp_C)
        setWeather(current.weatherDesc[0].value)
        // setIcon(weather[0].description)
        return current
      })
      .catch(()=>{
        setTemp("Error...")
        // setCity("...")
      })
  }, [fetchData]);

  // useEffect(() => {
    function getWeatherEmoji(desc) {
      const d = desc.toLowerCase();
      if (d.includes("clear")) setIcon( "☀️");
      if (d.includes("sunny")) setIcon( "☀️");
      if (d.includes("partly")) setIcon( "🌤️");
      if (d.includes("haze")) setIcon( "🌤️");
      if (d.includes("cloud")) setIcon( "☁️");
      if (d.includes("rain")) setIcon( "🌧️");
      if (d.includes("snow")) setIcon( "❄️");
      if (d.includes("thunder")) setIcon( "⛈️");
      if (d.includes("mist") || d.includes("fog")) setIcon( "🌫️");
      // else {setIcon( "🤷‍♂️")} ;
    }
    
  

  return (
    <>
      <div className='bg-blue-500 px-[20px] py-[25px] rounded-lg mb-[50px] h-[426px] w-[230px] flex flex-col justify-center items-center'>
        <div className='w-[100%] text-gray-300 font-bold h-[10%] flex justify-center items-start'>
          {today.toLocaleDateString('en-GB', {
            month: 'long',
          })}
          &nbsp;
          {today.toLocaleDateString('en-GB', {
            day: '2-digit'
          })},
          &nbsp;
          {today.toLocaleDateString('en-GB', {
            year: 'numeric',
          })}
        </div>
        <div className='w-[100%] text-white font-bold text-[26px] h-[15%] flex justify-center items-start'>{city}</div>
        <div className='w-[100%] mb-4 h-[20%] flex justify-center items-start'>
          <div className='w-[100%] text-[50px] h-[100%] flex justify-center items-start'>
            {icon}
          </div>
        </div>
        <div className='w-[100%] text-[36px] text-white font-bold h-[15%] flex justify-center items-center'>{temp}</div>
        <div className='w-[100%] text-[14px] font-bold text-white h-[15%] flex justify-center items-start'>{weather}</div>
        <div className='w-[100%] h-[10%] flex justify-center items-start'>
          <input className='w-[80%] h-[98%] text-gray-800 text-[12px] outline-none pl-3 rounded-bl-xl bg-gray-200' type="text"
            value={inputCity.length !== 0 ? inputCity[0].toUpperCase() + inputCity.slice(1) : ""}
            onChange={(e) => setInputCity(e.target.value)}
            placeholder='Tokyo'
          ></input>
          <button className='w-[20%] active:bg-gray-300 font-bold text-gray-500 text-[14px] h-[100%] bg-gray-100 flex justify-center items-center'
            onClick={(e) => {
              e.preventDefault()
              setCity(inputCity)
              getWeatherEmoji(weather)
              setFetchData(!fetchData)
            }}
          >Get</button>
        </div>
      </div>
    </>
  )
}

export default App
