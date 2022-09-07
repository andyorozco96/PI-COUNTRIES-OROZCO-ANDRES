import { GET_ALL_COUNTRIES, GET_COUNTRY_DETAIL, FILTER_BY_POP, FILTER_BY_NAME } from "./actionTypes";
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
    