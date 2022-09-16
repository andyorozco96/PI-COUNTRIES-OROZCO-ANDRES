import React from 'react';
import { Link } from 'react-router-dom';

import style from './Card.module.css'

function Card({id, image, name, continent}) {
  return (
    <div className={style.allCardContainer}>
      <a href={`/countries/${id}`}>
        <div className={style.cardIndividual}>
          <div>
            <div className={style.cardImgContainer}>
                <img src={image} alt={`Bandera de ${name}`}></img>
            </div>
            <div className={style.cardInfoContainer}>
              <h3>{name}</h3>
              <h5>{continent}</h5>
            </div>
        </div>
      </div> 
      </a>
    </div>
  )
}

export default Card