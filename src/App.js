import { useState,useEffect } from "react";
import axios from "axios";

function App() {


  const [data, setData] = useState({});
  const [town, setTown] = useState('');

  const key = '86db3bfac825fa717b16de04aee59bdd'
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${town}&units=metric&appid=${key}&lang=uk`

  const searchWeather = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) =>{
        setData(response.data)
      })
      setTown('');
    }
  }

  useEffect(()=>{
    fetch('https://api.openweathermap.org/data/2.5/weather?q=чернігів&units=metric&appid=86db3bfac825fa717b16de04aee59bdd&lang=uk')
      .then(response => response.json())
      .then(json => setData(json))
  },[]);

  return (
    <div className="app">
      <div className="inp-field">
        <input type="teext"
          value={town}
          onChange={(event) => setTown(event.target.value)}
          placeholder="Enter Location"
          onKeyDown={searchWeather} />
      </div>
      <div className="container">
        <div className="header">
          <div className="city">
            <p>{data.name}</p>
          </div>
        </div>
        <div className="temp">
          {data.main ? (
            <h1>
              {data.main.temp.toFixed()}
              °C
            </h1>
          ) : null}
        </div>
        <div className="desc">
          {data.weather ? <p>{data.weather[0].description}</p> : null}
        </div>
      </div>
      {data.name !== undefined
        && (
          <div className="footer">
            <div className="feels">
                <p>Відчувається як</p>              
              {
                data.main ? (
                  <p className="bold">
                    {data.main.feels_like.toFixed()}
                    °C
                  </p>
                ) : null}

            </div>
            <div className="humidity">
                <p>Вологість</p>            
            {
                data.main ? (
                  <p className="bold">
                    {data.main.humidity}
                    %
                  </p>
                ) : null}

            </div>
            <div className="wind">
              <p>Вітер</p>              
              {data.wind ? (
                <p className="bold">
                  {`${data.wind.speed} `}
                  M/C
                </p>
              ): null}

            </div>
            <div className="rainfall">
              <p>Опади за останню годину</p>
              {
              data.snow ? (
                <p className="bold">
                {`${data.snow["1h"]} `}
                MM
                </p>
              ) : <p>відсутні</p>
              }
            </div>
          </div>
        )}
    </div>
  );
}

export default App;
