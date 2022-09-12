import { 
    FILTER_BY_NAME, 
    FILTER_BY_POP, 
    GET_ACTIVITIES, 
    GET_ALL_COUNTRIES, 
    GET_COUNTRY_BY_NAME, 
    GET_COUNTRY_DETAIL,
    POST_ACTIVITY } 
    from "../actions/actionTypes"

const initialState = {
    countries : [],
    allCountries: [],
    activities: [],
    detail: [],
}

export default function rootReducer(state = initialState, {type, payload}){
    switch(type){
        case GET_ALL_COUNTRIES:
            return {
                ...state, 
                countries: payload,
                allCountries: payload
            }
        case GET_COUNTRY_DETAIL:
            return {
                ...state, 
                detail: payload
            }

        case GET_COUNTRY_BY_NAME:
            return {
                ...state,
                countries: payload,
            }
            
        case FILTER_BY_POP:
            let sortedByPop = payload === 'ASC' ?
                state.countries.sort(function (a,b){
                    if (a.population > b.population) return 1;
                    if (a.population < b.population) return -1;
                    else return 0
                }) :
                state.countries.sort(function (a,b){
                    if (a.population > b.population) return -1;
                    if (a.population < b.population) return 1;
                    else return 0
                })
            return{
                ...state,
                countries: sortedByPop
            }
        case FILTER_BY_NAME:
            let sortedByName = payload === 'ASC' ?
                state.countries.sort(function (a,b){
                    if (a.name > b.name) return -1;
                    if (a.name < b.name) return 1;
                    else return 0
                }) :
                state.countries.sort(function (a,b){
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    else return 0
                })
            return{
                ...state,
                countries: sortedByName
            }

        case POST_ACTIVITY:
            return {
                ...state

            }
        case GET_ACTIVITIES:
            return {
                ...state,
                activities: payload
            }

        default : 
            return initialState
    }
}