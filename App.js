import React from "react"
import {createStackNavigator} from "react-navigation-stack"
import {createAppContainer} from "react-navigation"
import OpenningScreen from './src/screens/OpenningScreen'
import {Provider as CitiesProvider} from "./src/contexts/CitiesContext"
import {Provider as AllInfoProvider} from "./src/contexts/AllInfoContext"
import CitiesScreen from "./src/screens/CitiesScreen"
import DistrictScreen from "./src/screens/DistrictScreen"


const navigator = createStackNavigator(
  {
    Openning : OpenningScreen,
    Cities : CitiesScreen,
    District : DistrictScreen
  },
  {
    initialRouteName : "Openning",
    defaultNavigationOptions : 
    {
      title : "Shopper Host"
    }
  }
)

const App = createAppContainer(navigator)

export default ()=>{
  return(
    <AllInfoProvider>
    <CitiesProvider>
      <App/>
    </CitiesProvider>
    </AllInfoProvider>
  )
}