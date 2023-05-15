import React from 'react';
import './App.css';
import 'typeface-poppins';
import 'bootstrap/dist/css/bootstrap.min.css';
import CityBox from './components/CityBox';
import SearchBar from './components/SearchBar';

import { OW_BASEURL, OW_APIKEY } from './data/config';

import { useAppDispatch, useAppSelector } from './app/hooks'
import { add, refresh, updateId } from './actions';

import cloudImg from './assets/img/cloud.png';
import rainImg from './assets/img/rain.png';
import hazeImg from './assets/img/haze.png';
import sunImg from './assets/img/sun.png';
import aquamarine from './assets/img/aquamarine.png';

export default function App() {

  const cities = useAppSelector(state => state.cities);
  const selectedId = useAppSelector(state => state.selectedId);
  const refreshKey = useAppSelector(state => state.refreshKey);
  const dispatch = useAppDispatch();

  const url = selectedId?
  `${OW_BASEURL}/weather?id=${selectedId}&appid=${OW_APIKEY}` : null;
  // `${OW_BASEURL}/weather?id=1&appid=${OW_APIKEY}` : null;

  function findCityInArray(id){
    return cities.find(city => Number(city.id) === Number(id))
  }  
  function addRefreshCity(newCity){
    !findCityInArray(selectedId)? 
      dispatch(add(newCity)):
      dispatch(refresh(selectedId, newCity))
    dispatch(updateId(newCity.id))
  }

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
          const newCity = {
            id: json.id,
            name: json.name,
            weather: weather,
            icon: icon,
            background: chooseImage(weather)
          };
          addRefreshCity(newCity)
        }
        
      })
      .catch(error => {
        const newCity = {
          id: selectedId,
          name: '',
          weather: error.message,
          icon: '',
          background: chooseImage('')
        };
        addRefreshCity(newCity)
      });
    }   
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedId, refreshKey])

  React.useEffect(()=>{
    localStorage.setItem('currentCities', JSON.stringify(cities))
  }, [cities])
  
  function getBackground(){
    if (selectedId){
      const city = findCityInArray(selectedId);
      return  city?
      city.background : ''
    }
  }
  function chooseImage(weather){ 
    console.log(weather)
    switch(true){
      case (/rain/i.test(weather)):
        return `url(${rainImg})`;
      case (/cloud/i.test(weather)):
        return `url(${cloudImg})`;
      case (/haze/i.test(weather)):
        return `url(${hazeImg})`;
      case (/clear/i.test(weather)):
        return `url(${sunImg})`; 
      default: return `url(${aquamarine})`;
    }
  }
  
  const background = (selectedId && findCityInArray(selectedId))? 
  getBackground():  `url(${aquamarine})`;
  const styles = {
    backgroundImage: `${background}`,
    backgroundSize: 'cover'
  }

  const city = cities.map(city => (
      <CityBox key={city.id} id={city.id} 
      name={city.name} 
      weather={city.weather} 
      icon={city.icon}/>
  ));

  return (
    <div>
      <div className="title" style={styles}>
        <div 
        className={`${background!==`url(${aquamarine})`? 'div-around-title': ''} rounded`}>
          <h2>Weather Info</h2>
        </div>
      </div>
      <div className='cities-div'> 
        <SearchBar /> 
        {city}
      </div>
    </div>
  );
}


