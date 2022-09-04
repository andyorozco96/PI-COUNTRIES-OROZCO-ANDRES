import { GET_ALL_COUNTRIES } from "./actionTypes";
import axios from "axios"


const URL_CHAR_DB = "http://localhost:3001/countries"


export function getCountries(){
   return async function(dispatch){
        var {data} = await axios(URL_CHAR_DB)
        return dispatch({
            type: GET_ALL_COUNTRIES,
            payload: data,
        })
   }
}