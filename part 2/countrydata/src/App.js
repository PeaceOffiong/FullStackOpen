import { useEffect, useState } from "react";
import axios from "axios";
import Weather from "./Weather";

function App() {
  const APIKey = process.env.REACT_APP_NOT_SECRET_CODE;
  const [countryName, setCountryName] = useState("");
  const [countriesOrCountryData, setCountriesOrCountryData] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [isBeyondTen, setIsBeyondTen] = useState();
  const [isOneCountry, setIsOneCountry] = useState();
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState();

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((responds) => setCountriesOrCountryData(responds.data));
  }, [countryName]);

  const setWeatherOfLocation = (result) => {
    const lat = result[0].capitalInfo.latlng[0];
    const lon = result[0].capitalInfo.latlng[0];

    axios(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`
    ).then((response) => {
      setWeather(response.data);
    }).then(() =>setLoading(false))
    setIsOneCountry(true);
  };

  const handleChange = (e) => {
    setIsOneCountry(false);
    setCountryName(e.target.value);
    const result = countriesOrCountryData.filter((country) => {
      if (e.target.value === "") {
        return countriesOrCountryData;
      }
      return country.name.common
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    if (result.length === 1) {
      setWeatherOfLocation(result);
    } else if (result.length < 10) {
      setIsBeyondTen(false);
    } else if (result.length > 10) {
      setIsBeyondTen(true);
    }

    setFilteredCountries(result);
  };

  const handleDisplay = (name) => {
    const specifiedCountry = countriesOrCountryData.find(
      (country) => country.name.common === name
    );
    setFilteredCountries([specifiedCountry]);
    setWeatherOfLocation([specifiedCountry]);
  };

  return (
    <div>
      <form>
        <label htmlFor="countries">Find Countries : </label>
        <input type="text" value={countryName} onChange={handleChange} />
      </form>

      <div className="list">
        {isBeyondTen ? (
          <p>Too many matches, specify another filter</p>
        ) : (
          <div>
            {isOneCountry ? (
              <ul>
                <div>
                  <h3>{filteredCountries[0].name.common}</h3>
                </div>
                <div>
                  <p>Capital: {filteredCountries[0].capital}</p>
                  <p>Area: {filteredCountries[0].area}</p>
                </div>
                <div>
                  <p>
                    languages:{" "}
                    {Object.keys(filteredCountries[0].languages).map(
                      (key, index) => {
                        return (
                          <li key={index}>
                            {filteredCountries[0].languages[key]}
                          </li>
                        );
                      }
                    )}
                  </p>
                </div>
                <div>
                  <p>
                    Flag:{" "}
                    <img
                      src={`${filteredCountries[0].flags.png}`}
                      alt={`flag of ${filteredCountries[0].name.common}`}
                    />
                  </p>
                </div>
                <div>
                  <h3>{`Weather in ${filteredCountries[0].capital}`}</h3>
                  <Weather loading={loading} weather={weather} />
                </div>
              </ul>
            ) : (
              <ul>
                {filteredCountries.map((each, index) => {
                  return (
                    <li key={index}>
                      <p>{each.name.common}</p>
                      <button onClick={() => handleDisplay(each.name.common)}>
                        Show
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
