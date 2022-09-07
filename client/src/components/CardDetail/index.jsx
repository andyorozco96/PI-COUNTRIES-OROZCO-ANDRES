import React from 'react'
import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import {getCountryDetail} from '../../redux/actions/index'

import style from './CardDetail.module.css'

function CardDetail(props) {
    const {id} = props.match.params
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(getCountryDetail(id))
    },[dispatch])

    const detail = useSelector((state) => state.detail)

  return (
    <div className={style.container}>
        <div>
            <img src={detail.flag} alt={`Bandera de ${detail.name}`}  width='250px' height='150px' />
        </div>
        <div>
            <h1>
                {detail.name}
            </h1>
            <div>Continent: {detail.continent}.</div>
            <div>Capital: {detail.capital}.</div>
            <div>Subregion: {detail.subregion}.</div>
            <div>Area: {detail.area} km².</div>
            <div>The estimated population of {detail.name} is {detail.population} people.</div>
            {
                detail.activities = [] ? <div>Activities: This country doesn't have any activity yet.</div> :
                detail.activities.map((activity) => {
                    return (
                        <div>
                            <h5>{activity.name}</h5>
                            <div>Duration: {activity.duration} hs</div>
                            <div>Season: {activity.season} hs</div>
                            <div>Difficulty: {activity.difficulty}</div>
                        </div>
                    )
                })

                
            }
        </div>
        <Link to='/countries'>
            <button>Back</button>
        </Link>
    </div>
  )
}

export default CardDetail