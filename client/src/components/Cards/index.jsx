/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
// Tengo que pensar ¿Que voy a hacer con el componente?
// 1) Voy a llamar a todos los personajes, necesito llenar mi STORE con los datos de mi DB y la API
// 2) Para ejecutar la accion getAllCharacters necesito DESPACHARLA para que la STORE la escuche a través del REDUCER
// 3) Para acceder al dispatch tengo que importarlo de 'react-redux'
// 4) Necesito traerme la información de los personajes del state, necesito el hook 'useSelector' y me lo importo de 'react-redux'
// 5) Si voy a crear estados locales del componente necesito importarme 'useState' de 'react'
// 6) Si voy a necesitar hacer 'algo' cuando el componente se monta, necesito el hook 'useEffect' de 'react.

import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getCountries} from '../../redux/actions/index'
import {Link} from 'react-router-dom'
import Card from '../Card'

import style from './Cards.module.css'


function Cards() {
  const dispatch = useDispatch() // Inicializo el dispatch para usarlo


  // Acá me traigo los países que estan cargados en mi store (redux)
  const countries = useSelector((state) => state.countries)

  /////////////////////////// ESTADO LOCAL (REACT) para el PAGINADO y FILTRADO /////////////////////////////
  
  // Estado local de paginado + función seteadora //
  const [page, setPages] = useState(0);
  
  // Estado local de ordenamiento + función seteadora //
  const [order, setOrder] = useState('ASC');
  
  // Estado local de filtros + función seteadora //
  const [filter, setFilter] = useState('')
  
  // Este hook es para disparar la acción: cuando se carga la pagina, o se modifica algun filtro o ordenamiento.
  useEffect(()=>{ 
    dispatch(getCountries(page, order, filter))
  },[dispatch, page, order, filter]);


  // REFRESH BUTTON //
  function handleClickReload (e){
    e.preventDefault();
    dispatch(getCountries());
  }
  
  
  // PAGINADO //
  const nextPage = (e) => {
    e.preventDefault();
    if (countries.length < 10) return
    else {
      setPages(page + 10)
    console.log(page)
    }
  }


  const prevPage = (e) => {
    e.preventDefault();
    if (page <= 0) setPages(0)
    else{
      setPages(page - 10)
    }
  }

  // ORDER //
  const handleOrder = (e) => {
    e.preventDefault();
    setOrder(e.target.value)
  }

  // FILTER//
  const handleFilter = (e) =>{
    e.preventDefault();
    setFilter(e.target.value)
  }

  return (
    <div>
      <Link to='/'>Create new activity</Link> 
      <h1>Countries</h1>
      <button onClick = {e => {handleClickReload(e)}}>Refresh countries</button>
      <div>
            <label value='Continent'>
              Order by continent
            </label>
            <select onChange={e => handleFilter(e)}>
                <option value=''>All</option>
                <option value="Africa">Africa</option>
                <option value="Antarctica">Antarctica</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="South America">South America</option>
                <option value="North America">North America</option>
                <option value="Oceania">Oceania</option>
            </select>

            <label value='Name'>
              Order by name
            </label>
            <select onChange={e => handleOrder(e)}>
                <option value="ASC">From A to Z</option> {/* equivale a DESC */}
                <option value="DESC">From Z to A</option> {/* equivale a ASC*/}
            </select>

            <label value='Population'>
              Population
            </label>
            <select onChange={e => handleFilter(e)}>
                <option value="">None</option>
                <option value="ASC">Ascendent</option>
                <option value="DESC">Descendent</option>
            </select>

        </div>

      <div className={style.container}>
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

      <div>
        <button onClick = {e => {prevPage(e)}} disabled = {page <= 0}>Back</button> {/* El disable actúa por un booleano true or false*/}
        <button onClick = {e => {nextPage(e)}} disabled = {countries.length < 10}>Next</button>
      </div>

    </div>
  )
}

export default Cards