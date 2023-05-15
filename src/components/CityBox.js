import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faSun, faXmark, faRotateRight } from '@fortawesome/free-solid-svg-icons';

export default function CityBox(props) {
  return (
    <div className="city-box my-3 rounded">
      <div className="left-aligned-items">
        <p className="mx-3 my-2 city-text">{props.name}</p>
      </div>
      <div className="centered-items">
        <FontAwesomeIcon icon={faSun} />
        <p className="mx-3 my-2 weather-text">{props.weather}</p>
      </div>
      <div className="right-aligned-items">
        <button className="btn">
          <FontAwesomeIcon icon={faRotateRight} />
        </button>
        <button className="btn">
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
    </div>
  );
}