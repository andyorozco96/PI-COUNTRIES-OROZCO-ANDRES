import { GET_ALL_COUNTRIES, GET_COUNTRY_DETAIL } from "./actionTypes";
import axios from "axios"


const URL_CHAR_DB = "http://localhost:3001/countries"


export function getCountries(page, order, filter){
   return async function(dispatch){
        try{
            var {data} = await axios(`${URL_CHAR_DB}/?page=${page}&order=${order}&filter=${filter}`)
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