import createDataContext from "./createDataContext"


const citiesReducer = (state, action) => {
    switch(action.type){
        case "fetch_cities" : return {...state, cities : action.payload}
        default : 
            return state
    }
}

const fetchCities = dispatch => (cities) => {
    dispatch({type:"fetch_cities", payload : cities})
}


export const {Context, Provider} = createDataContext(citiesReducer, {fetchCities}, { cities : []})
