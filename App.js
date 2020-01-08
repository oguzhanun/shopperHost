import {createStackNavigator} from "react-navigation-stack"
import {createAppContainer} from "react-navigation"
import OpenningScreen from './src/screens/OpenningScreen';


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


export default createAppContainer(navigator)