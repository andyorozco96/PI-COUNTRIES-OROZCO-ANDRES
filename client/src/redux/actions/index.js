import { 
    GET_ALL_COUNTRIES, 
    GET_COUNTRY_DETAIL, 
    FILTER_BY_POP, 
    FILTER_BY_NAME,
    GET_COUNTRY_BY_NAME, 
    GET_ACTIVITIES} 
from "./actionTypes";

import axios from "axios"


const URL_CHAR_DB = "http://localhost:3001/countries"


export function getCountries(filter){
   return async function(dispatch){
        try{
            var {data} = await axios(`${URL_CHAR_DB}/?filter=${filter}`)
            return dispatch({
                type: GET_ALL_COUNTRIES,
                payload: data,
            })
        }catch(error){
            console.log(error)
        }
   }
}

export function getCountryByName(name){
    return async function (dispatch){
        try{
            var {data} = await axios(`${URL_CHAR_DB}/?name=${name}`)
            return dispatch({
                type: GET_COUNTRY_BY_NAME,
                payload: data,
            })
        } catch(error){
            console.log(error)
        }
    }
}

export function getCountryDetail(id){
    return async function(dispatch){
        try{
            var {data} = await axios(`${URL_CHAR_DB}/${id}`)
            return dispatch({
                type: GET_COUNTRY_DETAIL,
                payload: data,
            })
        }catch(error){
            console.log(error)
        }
   }
}


export function sortByPopulation(payload){
    return {
        type: FILTER_BY_POP,
        payload
    }
}

export function sortByName(payload){
    return {
        type: FILTER_BY_NAME,
        payload
    }
}

export function postActivity(payload){
        return async function (dispatch){
            const {data} = await axios.post('http://localhost:3001/activities', payload)
            return data
        }
}

export function getAllActivities(){
    return async function(dispatch){
        const {data} = await axios('http://localhost:3001/activities')
        return dispatch({
            type: GET_ACTIVITIES,
            payload: data
        })
    }
}
    