import React from 'react'
// Tengo que pensar ¿Que voy a hacer con el componente?
// 1) Voy a llamar a todos los personajes, necesito llenar mi STORE con los datos de mi DB y la API
// 2) Para ejecutar la accion getAllCharacters necesito DESPACHARLA para que la STORE la escuche a través del REDUCER
// 3) Para acceder al dispatch tengo que importarlo de 'react-redux'
// 4) Necesito traerme la información de los personajes del state, necesito el hook 'useSelector' y me lo importo de 'react-redux'
// 5) Si voy a crear estados locales del componente necesito importarme 'useState' de 'react'
// 6) Si voy a necesitar hacer 'algo' cuando el componente se monta, necesito el hook 'useEffect' de 'react.

import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getCountries} from '../../redux/actions/index'
import {Link} from 'react-router-dom'
import Card from '../Card'


function Cards() {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getCountries())
  },[])

  const countries = useSelector((state) => state.countries)

  return (
    <div>
      <h1>Countries</h1>
      {
        countries && countries.map((e)=>{
          return (
            <div>
              <Link to={`/countries/${e.id}`}>
                <Card id={e.id} image={e.flag} name={e.name} continent={e.continent} key={e.id}></Card>
              </Link>
            </div>
          )
        })
      }
    </div>
  )
}

export default Cards