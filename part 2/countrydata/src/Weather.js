
const Weather = ({ loading, weather }) => {
    if (loading) {
       return <h5>Loading ...</h5>
    }
  return (
    <div>
      {`temperature - ${weather.main.temp}K`}
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt=""
      />
      <p>wind : {weather.wind.speed}</p>
    </div>
  );
}

export default Weather