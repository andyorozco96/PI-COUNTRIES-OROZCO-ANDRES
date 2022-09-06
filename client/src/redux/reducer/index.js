import { GET_ALL_COUNTRIES, GET_COUNTRY_DETAIL } from "../actions/actionTypes"

const initialState = {
    countries : [],
    activities: [],
    detail: [],
}

export default function rootReducer(state = initialState, {type, payload}){
    switch(type){
        case GET_ALL_COUNTRIES:
            return {
                ...state, 
                countries: payload
            }
        case GET_COUNTRY_DETAIL:
            return {
                ...state, 
                detail: payload
            }
        default : 
            return initialState
    }
}