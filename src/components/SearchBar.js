import React from 'react';
import citiesData from '../data/cities.json'

export default function SearchBar(props) {

    const handleChange = (event) => {
        const index = event.target.selectedIndex;
        const el = event.target.childNodes[index]
        const option =  el.getAttribute('id');

        props.selectId(option)
    };

    const searchCity = citiesData.map(city => (
        <option key={`option-${city._id}`} value={city.name} id={city._id}>
          {city.name}
        </option>
    ));
    return (
        <div className="search-box my-3 rounded">
        <select className="form-select text-center" onChange={handleChange}>
            <option selected disabled>Add a city...</option>
            {searchCity}
        </select>
        </div>
    );
}