import { useState } from 'react'
import React from 'react';
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function Type(props){

    const handleRadioChange = (event) => {
        props.onSelectedAirplaneChange(event.target.value);
    };
return(

    <div className='container'>
        <div className="form-check">
        <input
            className="form-check-input input-local"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            value="local"
            onChange={handleRadioChange}
            checked={props.selectedAirplane === 'local'}
        />
        <label className="form-check-label" htmlFor="flexRadioDefault1">
            Local
        </label>
        </div>
        <div className="form-check">
        <input
            className="form-check-input input-regional"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            value="regional"
            onChange={handleRadioChange}
            checked={props.selectedAirplane === 'regional'}
        />
        <label className="form-check-label" htmlFor="flexRadioDefault2">
            Regional
        </label>
        </div>
        <div className="form-check">
        <input
            className="form-check-input input-regional"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault3"
            value="international"
            onChange={handleRadioChange}
            checked={props.selectedAirplane === 'international'}
        />
        <label className="form-check-label" htmlFor="flexRadioDefault3">
            International
        </label>
        </div>
    </div>
    );
}

export default Type
//defaultChecked={true}