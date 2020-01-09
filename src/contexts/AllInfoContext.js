import createDataContext from "./createDataContext"


const allInfoReducer = (state, action) => {
    switch(action.type){
        case "fetch_all" : return  {...state, all : action.payload}
        default : 
            return state
    }
}


const fetchAll = dispatch => (all) => {
    dispatch({type:"fetch_all", payload : all})
}

export const {Context, Provider} = createDataContext(allInfoReducer, { fetchAll }, { all : []})
