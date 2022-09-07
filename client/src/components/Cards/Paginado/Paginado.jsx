import React from 'react'
import style from './Paginado.module.css'

function Paginado({countriesPerPage, countries, paginado}) {
    const pageNumbers = []
    for(let i=1; i <= Math.ceil(countries/countriesPerPage); i++){
        pageNumbers.push(i)
    }

  return (
    <nav>
        <ul className={style.ul}>
        {
            pageNumbers && 
            pageNumbers.map(number => {
                return (
                <li key={number}>
                    <a onClick={() => paginado(number)}>{number}</a>
                </li>
                )
            })}
        </ul>
    </nav>
  )
}

export default Paginado