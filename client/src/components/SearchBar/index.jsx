import React from 'react'
import {useDispatch} from 'react-redux';
import {useState} from 'react'
import {getCountryByName} from '../../redux/actions/index'

import style from './SearchBar.module.css'

function SearchBar() {
    const dispatch = useDispatch();

    const [name, setName] = useState('')

    function handleSearchBar(e){
        e.preventDefault();
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getCountryByName(name))
        setName("")
    }

  return (
    <form onSubmit={e => handleSubmit(e)}>
        <input 
          className={style.inputSearch}
          type="text" 
          placeholder='Country name' 
          onChange={e => handleSearchBar(e)}/>
        <a><i class="fa-solid fa-magnifying-glass"></i></a>
    </form>
  )
}

export default SearchBar