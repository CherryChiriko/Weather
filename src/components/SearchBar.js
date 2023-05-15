import React from 'react';

export default function SearchBar() {
  return (
    <div className="city-box my-3 rounded">
      <select className="form-select">
        <option selected disabled>Add a city...</option>
        <option>Mumbai</option>
      </select>
    </div>
  );
}