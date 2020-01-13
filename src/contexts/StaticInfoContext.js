import React,{useReducer} from "react"

const StaticInfoContext = React.createContext()

export const StaticInfoProvider = ({children})=>{
    
    const StaticInfoReducer = (state,action)=>{
        switch(action.type){
            case "fetch_staticinfo" : return {...state, staticInfo : action.payload}
            default : return state
        }
    }

    const [state, dispatch] = useReducer(StaticInfoReducer,[])

    const fetchStaticInfo = (dispatch) => (staticInfo) => {
        dispatch({type:"fetch_staticinfo", payload:staticInfo})
    }

    return(
        <StaticInfoContext.Provider
                value={{state, fetchStaticInfo}}>
                {children}
        </StaticInfoContext.Provider>
    )
}

export default StaticInfoContext