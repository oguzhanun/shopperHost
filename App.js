import React from "react"
import {createStackNavigator} from "react-navigation-stack"
import {createAppContainer} from "react-navigation"
import OpenningScreen from './src/screens/OpenningScreen'
import {Provider as CitiesProvider} from "./src/contexts/CitiesContext"
import {Provider as AllInfoProvider} from "./src/contexts/AllInfoContext"
import CitiesScreen from "./src/screens/CitiesScreen"
import DistrictScreen from "./src/screens/DistrictScreen"
import CategoryScreen from "./src/screens/CategoryScreen"
import ShopsScreen from "./src/screens/ShopsScreen"
import InfoScreen from "./src/screens/InfoScreen"


const navigator = createStackNavigator(
  {
    Openning : OpenningScreen,
    Cities : CitiesScreen,
    District : DistrictScreen,
    Category : CategoryScreen,
    Shops : ShopsScreen,
    Info : InfoScreen
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