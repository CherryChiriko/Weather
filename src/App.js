import React from 'react';
import './App.css';
import CityBox from './components/CityBox';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './components/SearchBar';

export default function App() {
  var cityArr = [''] 
  const city = cityArr.map(city => {
    return (
      <CityBox name={'city'} weather={'weather'}/>
    // <CityBox key={city.id} {...city}/>
  )})
  return (
    <div>
      <div className="title">
        <h2>Weather Info</h2>
      </div>
      <div className='cities-div'> 
        <SearchBar/> 
        {city}
      </div>
    </div>
  );
}
