import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import OpenningScreen from "./src/screens/OpenningScreen";
import CitiesScreen from "./src/screens/CitiesScreen";
import CategoryScreen from "./src/screens/CategoryScreen";
import ShopsScreen from "./src/screens/ShopsScreen";
import InfoScreen from "./src/screens/InfoScreen";
import { LanguageProvider } from "./src/contexts/LanguageContext";
import SettingsScreen from "./src/screens/SettingsScreen";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { MaterialCommunityIcons,AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Linking } from "expo";


const navigator = createBottomTabNavigator(
  {
    Stacks: createStackNavigator(
      {
        Openning: OpenningScreen,
        Cities: CitiesScreen,
        Category: CategoryScreen,
        Shops: ShopsScreen,
        Info: InfoScreen

        //Settings: SettingsScreen,
      },
      {
        initialRouteName: "Openning",
        defaultNavigationOptions:{
          title: "Laklak",
        },
        navigationOptions: ({ navigation }) => ({
          title: "Laklak",
          tabBarOnPress:()=>{
            navigation.navigate("Cities")
          },
          tabBarIcon: () => {
            return (
              <View
                style={{
                  borderColor: "green",
                  borderWidth: 0,
                  //backgroundColor: "yellow"
                }}
              >
                <TouchableOpacity onPress={() => navigation.navigate("Cities")}>
                  <AntDesign
                    name="bars"
                    size={30}
                    color="red"
                  />
                </TouchableOpacity>
              </View>
            );
          }

        })
      }
    ),
    Settings: {
      screen: SettingsScreen,
      navigationOptions: ({ navigation }) => ({
        
        tabBarIcon: () => {
          return (
            <View
              style={{
                borderColor: "green",
                borderWidth: 0,
                //backgroundColor: "yellow"
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                <MaterialCommunityIcons
                  name="settings"
                  size={30}
                  color="green"
                />
              </TouchableOpacity>
            </View>
          );
        }
      })
    },
    Instagram: {
      screen : (() => {
        return (
          <View>
            {/* <MaterialCommunityIcons name="instagram" color="red" /> */}
          </View>
        );
      }),
      navigationOptions: ({ navigation }) => ({
        tabBarOnPress:()=>{
          navigation.navigate("")
        },
        tabBarIcon: () => {
          return (
            <View
              style={{
                borderColor: "green",
                borderWidth: 0,
                //backgroundColor: "yellow"
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate("")}>
                <MaterialCommunityIcons
                  name="instagram"
                  size={30}
                  color="#E83F3C"
                />
              </TouchableOpacity>
            </View>
          );
        }
      })
    },
    Twitter: {
      screen : (() => {
        return (
          <View>
            {/* <MaterialCommunityIcons name="instagram" color="red" /> */}
          </View>
        );
      }),
      navigationOptions: ({ navigation }) => ({
        tabBarOnPress:()=>{
          navigation.navigate("")
        },
        tabBarIcon: () => {
          return (
            <View
              style={{
                borderColor: "green",
                borderWidth: 0,
                //backgroundColor: "yellow"
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate("")}>
                <MaterialCommunityIcons
                  name="twitter"
                  size={30}
                  color="#3AA1F2"
                />
              </TouchableOpacity>
            </View>
          );
        }
      })
    },
    Facebook: {
      screen : (() => {
        return (
          <View>
            {/* <MaterialCommunityIcons name="instagram" color="red" /> */}
          </View>
        );
      }),
      navigationOptions: ({ navigation }) => ({
        tabBarOnPress:()=>{
          navigation.navigate("")
        },
        tabBarIcon: () => {
          return (
            <View
              style={{
                borderColor: "green",
                borderWidth: 0,
                //backgroundColor: "yellow"
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate("")}>
                <AntDesign
                  name="facebook-square"
                  size={30}
                  color="#3b5998"
                />
              </TouchableOpacity>
            </View>
          );
        }
      })
    }
  },
  {
    initialRouteName: "Stacks",
    defaultNavigationOptions: {
      tabBarOptions: {
        swipeEnabled: true,
        showLabel: false,
        //activeBackgroundColor: "#ddd",
        style: {
          borderColor: "red",
          borderWidth: 0,
          backgroundColor: "#eee",
          height: 40,
          marginHorizontal: 0,
          borderRadius: 0
        },
        tabStyle: {
          borderColor: "blue",
          borderWdith: 1
        }
      }
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
