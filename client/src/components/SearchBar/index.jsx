import React from 'react'
import {useDispatch} from 'react-redux';
import {useState} from 'react'
import {getCountryByName} from '../../redux/actions/index'

import style from './SearchBar.module.css'

function SearchBar() {
    const dispatch = useDispatch();

    const [name, setName] = useState('')

    function handleSearchBar(e){
        e.preventDefault(e);
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault(e);
        dispatch(getCountryByName(name))
        setName("")
    }

  return (
    <form>
        <input className={style.inputSearch}type="text" placeholder='Country name' onChange={e => handleSearchBar(e)}/>
        <button type="submit" onClick={e => handleSubmit(e)} value="Search">Search</button>
    </form>
  )
}

export default SearchBar