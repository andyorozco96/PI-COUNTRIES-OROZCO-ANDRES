import React from 'react'
import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import {getAllActivities, getCountryDetail} from '../../redux/actions/index'

import style from './CardDetail.module.css'

function CardDetail(props) {
    const {id} = props.match.params
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(()=> {
        dispatch(getCountryDetail(id))
    },[])

    const detail = useSelector((state) => state.detail)
    console.log(detail)

    if(Object.keys(detail).length >= 1){
        return (
            <div className={style.detailContainer}>
                <div className={style.detailInfoContainer}>

                    <div className={style.detailTitleContainer}>
                        <h3>
                            {detail.name}
                        </h3>
                    </div>

                    <div className={style.detailImgContainer}>
                        <img src={detail.flag} alt={`Bandera de ${detail.name}`}  width='250px' height='150px' />
                    </div>

                    
                    <div className={style.detailSubInfoContainer}>
                        <div>Continent: <span>{detail.continent}</span>.</div>
                        <div>Capital: <span>{detail.capital}</span>.</div>
                        <div>Subregion: <span>{detail.subregion}</span>.</div>
                        <div>Area: <span>{detail.area} km²</span>.</div>
                        <div>The estimated population of {detail.name} is <span>{detail.population}</span> people.</div>
                        <div> <h3>Most popular activities:</h3>
                        {
                            detail.activities.length <= 0 ? <div>This country doesn't have any activity yet.</div> : 
                            detail.activities.map((activity) =>
                            (
                                    <div>
                                        <h4>{activity.name}</h4>
                                        <div>Duration: <span>{activity.duration} hours</span>  approximately</div>
                                        <div>Season: <span>{activity.season}</span></div>
                                        <div>Difficulty: <span>{activity.difficulty}</span> {"(from 1 to 5 scale)"}</div>
                                    </div>
                                )
                            )
                        }
                        </div>
                    </div>
                    <div className={style.detailBtnContainer}>
                    <Link className={style.formBtn} a to='/countries'>Return</Link>    
                    <Link className={style.formBtn} a to="/activities">Create new activity</Link>
                    </div>
                </div>
            </div>
          )
    } else return (
    <h3>Loading...</h3>
    )  
}

export default CardDetail