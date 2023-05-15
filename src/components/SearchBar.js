import React from 'react';
import citiesData from '../data/cities.json'
import { updateId } from '../actions';
import { useAppDispatch } from '../app/hooks';

export default function SearchBar(props) {

    const dispatch = useAppDispatch();

    const handleChange = (event) => {
        const index = event.target.selectedIndex;
        const el = event.target.childNodes[index]
        const option =  el.getAttribute('id');

        dispatch(updateId(option))
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