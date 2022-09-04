import React from 'react'

function Card({id, image, name, continent}) {
  return (
    <div>
        <img src={image} alt={`Bandera de ${name}`} width="200px" height="250px"></img>
        <h3>{name}</h3>
        <h5>{continent}</h5>
    </div>
  )
}

export default Card