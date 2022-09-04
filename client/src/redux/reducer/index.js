import { GET_ALL_COUNTRIES } from "../actions/actionTypes"

const initialState = {
    countries : [],
    activities: [],
}

export default function rootReducer(state = initialState, {type, payload}){
    switch(type){
        case GET_ALL_COUNTRIES:
            return {
                ...state, countries: payload
            }
        default : 
            return initialState
    }
}