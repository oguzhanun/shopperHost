import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import OpenningScreen from "./src/screens/OpenningScreen";
import CitiesScreen from "./src/screens/CitiesScreen";
import CategoryScreen from "./src/screens/CategoryScreen";
import ShopsScreen from "./src/screens/ShopsScreen";
import InfoScreen from "./src/screens/InfoScreen";
import { LanguageProvider } from "./src/contexts/LanguageContext";
import SettingsScreen from "./src/screens/SettingsScreen";

const navigator = createStackNavigator(
  {
    Openning: OpenningScreen,
    Cities: CitiesScreen,
    Category: CategoryScreen,
    Shops: ShopsScreen,
    Info: InfoScreen,
    Settings: SettingsScreen
  },
  {
    initialRouteName: "Openning",
    defaultNavigationOptions: {
      title: "Laklak"
    }
  }
);

const App = createAppContainer(navigator);

export default () => {
  return (
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
};
