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
import {getCountries, sortByPopulation, sortByName} from '../../redux/actions/index'
import {Link} from 'react-router-dom'
import Card from '../Card'
import Paginado from './Paginado/Paginado'
import SearchBar from '../SearchBar';

import style from './Cards.module.css'


function Cards() {
  const dispatch = useDispatch() // Inicializo el dispatch para usarlo


  // Acá me traigo los países que estan cargados en mi store (redux)
  const countries = useSelector((state) => state.countries)

  /////////////////////////// ESTADO LOCAL (REACT) para el PAGINADO y FILTRADO /////////////////////////////
  
  // Estado local de paginado + función seteadora //
  const [page, setPages] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(10)
  const lastCountry = page * countriesPerPage; 
  const firstCountry =  lastCountry - countriesPerPage
  const currentCountries = countries.slice(firstCountry, lastCountry)

  const paginado = (pageNumber) => {
    setPages(pageNumber)
  }

  
  // Estado local de ordenamiento + función seteadora //
  const [order, setOrder] = useState('ASC');
  
  // Estado local de filtro continente + función seteadora //
  const [filter, setFilter] = useState('')

  // Estado local de filtros + función seteadora //
  const [sorted, setSorted] = useState('ASC')
  
  // Este hook es para disparar la acción: cuando se carga la pagina, o se modifica algun filtro o ordenamiento.
  useEffect(()=>{ 
    dispatch(getCountries(filter))
  },[dispatch, filter]);


  // BOTÓN PARA RECARGAR //
  function handleClickReload (e){
    e.preventDefault();
    setPages(1)
    dispatch(getCountries(''));
  }
  

  // ORDENAMIENTO ALFABÉTICO//
  const handleOrder = (e) => {
    e.preventDefault();
    setOrder(e.target.value)
    dispatch(sortByName(order))
  }

  // FILTRO POR CONTINENTE //
  const handleFilter = (e) =>{
    e.preventDefault();
    setFilter(e.target.value)
  }

  // ORDENAR POR POBLACIÓN //
  const handlePop = (e) =>{
    setSorted(e.target.value)
    dispatch(sortByPopulation(sorted))
  }

  return (
    <div className={style.container}>
      <Link to='/activities'><button>Create new activity</button></Link> 
      <h1>Countries</h1>
      <button onClick = {e => {handleClickReload(e)}}>Refresh countries</button>
      <div className={style.filterContainer}>
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
        </div>

        <div>
          <label value='Name'>
            Order by name
          </label>
          <select onChange={e => handleOrder(e)}>
              <option value="ASC">From A to Z</option> {/* equivale a DESC */}
              <option value="DESC">From Z to A</option> {/* equivale a ASC*/}
          </select>
        </div>

        <div>
          <label value='Population'>
            Population
          </label>
          <select onChange={e => handlePop(e)}> 
              <option value="ASC">Ascendent</option>
              <option value="DESC">Descendent</option>
          </select>
        </div>
      </div>

      <Paginado countriesPerPage={countriesPerPage} countries={countries.length} paginado={paginado}>
      </Paginado>

      <SearchBar/>

      <div className={style.cardsContainer}>
      {
        currentCountries && currentCountries.map((e)=>{
          return (
            <div>
                <Card id={e.id} image={e.flag} name={e.name} continent={e.continent} key={e.id}></Card>
            </div>
          )
        })
      }
      </div>
    </div>
  )
}

export default Cards