import React from 'react';
import { Link } from 'react-router-dom';

import style from './Card.module.css'

function Card({id, image, name, continent}) {
  return (
    <div>
        <Link to={`/countries/${id}`}>
          <img src={image} alt={`Bandera de ${name}`}></img>
        </Link>
        <h3>{name}</h3>
        <h5>{continent}</h5>
    </div>
  )
}

export default Card