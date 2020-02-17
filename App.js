import React from "react";
import { View, Text, Image } from "react-native";
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
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Linking } from "expo";
import MapScreen from "./src/screens/MapScreen"
import RatingScreen from "./src/screens/RatingScreen";

const navigator = createBottomTabNavigator(
  {
    Stacks: createStackNavigator(
      {
        //Openning: OpenningScreen,
        Cities: CitiesScreen,
        Category: CategoryScreen,
        Shops: ShopsScreen,
        Info: InfoScreen,
        Map : MapScreen,
        Rating : RatingScreen

        //Settings: SettingsScreen,
      },
      {
        initialRouteName: "Cities",
        defaultNavigationOptions: {
          title:
              <Image
                style={{
                  position:"relative",
                  resizeMode:"contain",
                  borderColor: "red",
                  borderWidth: 1,
                  width: 50,
                  height: 50
                }}
                source={require("./assets/status.png")}
              />,
            headerTitleStyle:{
              //backgroundColor:"green",
              margin:0,
              padding:0,
              top:-3,
              left:-15,
              width:80,
              height:80  
            }
            
        },

        navigationOptions: ({ navigation }) => ({
          title: "Laklak",
          tabBarOnPress: () => {
            navigation.navigate("Cities");
          },
          tabBarIcon: () => {
            return (
              <View
                style={{
                  borderColor: "green",
                  borderWidth: 0
                  //backgroundColor: "yellow"
                }}
              >
                <TouchableOpacity onPress={() => navigation.navigate("Cities")}>
                  <AntDesign name="back" size={30} color="red" />
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
                borderWidth: 0
                //backgroundColor: "yellow"
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                <MaterialCommunityIcons
                  name="settings"
                  size={30}
                  color="#43862F"
                />
              </TouchableOpacity>
            </View>
          );
        }
      })
    },
    Instagram: {
      screen: () => {
        return (
          <View>
            {/* <MaterialCommunityIcons name="instagram" color="red" /> */}
          </View>
        );
      },
      navigationOptions: ({ navigation }) => ({
        tabBarOnPress: () => {
          navigation.navigate("");
        },
        tabBarIcon: () => {
          return (
            <View
              style={{
                borderColor: "green",
                borderWidth: 0
                //backgroundColor: "yellow"
              }}
            >
              <TouchableOpacity onPress={() => {
                //navigation.navigate("")
                Linking.canOpenURL("http://instagram.com/_u/Lak.Look").then((supported)=>{
                  if(supported){
                    Linking.openURL("http://instagram.com/_u/Lak.Look")
                  } else{

                  }
                })
              }}>
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
    // Twitter: {
    //   screen: () => {
    //     return (
    //       <View>
    //         {/* <MaterialCommunityIcons name="instagram" color="red" /> */}
    //       </View>
    //     );
    //   },
    //   navigationOptions: ({ navigation }) => ({
    //     tabBarOnPress: () => {
    //       navigation.navigate("");
    //     },
    //     tabBarIcon: () => {
    //       return (
    //         <View
    //           style={{
    //             borderColor: "green",
    //             borderWidth: 0
    //             //backgroundColor: "yellow"
    //           }}
    //         >
    //           <TouchableOpacity onPress={() => navigation.navigate("")}>
    //             <MaterialCommunityIcons
    //               name="twitter"
    //               size={30}
    //               color="#3AA1F2"
    //             />
    //           </TouchableOpacity>
    //         </View>
    //       );
    //     }
    //   })
    // },
    Facebook: {
      screen: () => {
        return (
          <View>
            {/* <MaterialCommunityIcons name="instagram" color="red" /> */}
          </View>
        );
      },
      navigationOptions: ({ navigation }) => ({
        tabBarOnPress: () => {
          navigation.navigate("");
        },
        tabBarIcon: () => {
          return (
            <View
              style={{
                borderColor: "green",
                borderWidth: 0
                //backgroundColor: "yellow"
              }}
            >
              <TouchableOpacity onPress={() => {
                //navigation.navigate("")
                Linking.canOpenURL("fb://profile/LakLook.Tr").then((supported)=>{
                  if(supported){
                    Linking.openURL("fb://profile/LakLook.Tr")
                  } else{
                    Linking.openURL("https://www.facebook.com/LakLook.Tr")
                  }
                })
              }}>
                <AntDesign name="facebook-square" size={30} color="#3b5998" />
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
