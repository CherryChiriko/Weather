import React from 'react';
import './App.css';
import 'typeface-poppins';
import 'bootstrap/dist/css/bootstrap.min.css';
import CityBox from './components/CityBox';
import SearchBar from './components/SearchBar';

import { OW_BASEURL, OW_APIKEY } from './data/config';

export default function App() {

  function getInitialState(){
    const currentCities = JSON.parse(localStorage.getItem('currentCities'));
    return currentCities || [];
  }
  const [cities, setCities] = React.useState(getInitialState());
  const [selectedId, setSelectedId] = React.useState(null);
  const [refreshKey, setRefreshKey] = React.useState(0);

  const url = selectedId?
  `${OW_BASEURL}/weather?id=${selectedId}&appid=${OW_APIKEY}` : null;
  // `${OW_BASEURL}/weather?id=1&appid=${OW_APIKEY}` : null
  React.useEffect(()=>{
    if (url){
      fetch(url)
      .then(response => {
        if(!response.ok){
          if (response.status === 404) {
            throw new Error('City not found');
          }
          throw new Error('Network response error');
        }
        return response.json()
      })
      .then(json =>  { 
        if (json){
          const weather = json.weather[0].description;
          const icon = `https://openweathermap.org/img/w/${json.weather[0].icon}.png`
          if (!findCityInArray(selectedId)){
            const newCity = {
              id: json.id,
              name: json.name,
              weather: weather,
              icon: icon
            };
            setCities(prevCities=>(
              [...prevCities, newCity]))
          }
          else {
            setCities(prevCities =>
              prevCities.map(city =>
                city.id === selectedId ? 
                { id: json.id, name: json.name, weather: weather, icon: icon } : city
              )
            );
          }
        }
        
      })
      .catch(error => {
        if (!findCityInArray(selectedId)){
          const newCity = {
            id: selectedId,
            name: '',
            weather: error.message,
            icon: ''
          };
          setCities(prevCities=>(
          [...prevCities, newCity]))
        } else {
          setCities(prevCities =>
            prevCities.map(city =>
              city.id === selectedId ? 
              { id: selectedId, name: '', weather: error.message, icon: '' } : city
            )
          );
        }
      });
    }   
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedId, refreshKey])

  React.useEffect(()=>{
    localStorage.setItem('currentCities', JSON.stringify(cities))
  }, [cities])

  function findCityInArray(id){
    return cities.find(city => Number(city.id) === Number(id))
  }  
 
  function reloadCity(cityId){
    if (cityId !== selectedId){
      setSelectedId(cityId)
    }
    else {
    setRefreshKey(prevRefreshKey => prevRefreshKey +1)}
  }
  function deleteCity(cityId){
    setCities(prevCities => prevCities.filter(city => city.id !== cityId))
  }

  const city = cities.map(city => (
      <CityBox key={city.id} id={city.id} 
      name={city.name} 
      weather={city.weather} 
      icon={city.icon}
      handleDelete={cityId => deleteCity(cityId)}
      handleReload={cityId => reloadCity(cityId)}/>
  ));

  return (
    <div>
      <div className="title">
        <h2>Weather Info</h2>
      </div>
      <div className='cities-div'> 
        <SearchBar 
        selectId={id => setSelectedId(id)}/> 
        {city}
      </div>
    </div>
  );
}


// const id = 524901;
// const url= 'https://jsonplaceholder.typicode.com/todos/1'

