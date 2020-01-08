import React from "react"
import {createStackNavigator} from "react-navigation-stack"
import {createAppContainer} from "react-navigation"
import OpenningScreen from './src/screens/OpenningScreen';
import {Provider as CitiesProvider} from "./src/contexts/CitiesContext"

const navigator = createStackNavigator(
  {
    Openning : OpenningScreen
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
    <CitiesProvider>
      <App/>
    </CitiesProvider>
  )
}