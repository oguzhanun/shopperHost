import React, { useEffect, useContext, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
  BackHandler,
  NativeModules
} from "react-native";
import { NavigationEvents } from "react-navigation";
import SafeAreaView from "react-native-safe-area-view";
import NetInfo from "@react-native-community/netinfo";
import LanguageContext from "../contexts/LanguageContext";
import * as SQLite from "expo-sqlite";

const OpenningScreen = ({ navigation }) => {
  const [counter, setCounter] = useState(0);
  const { state, changeLanguage } = useContext(LanguageContext);
  const [lang, setLang] = useState()
  const [message, setMessage] = useState("WELCOME TO SHOPPERHOST :-|)");
  

  useEffect(() => {
    if (counter <= 1) {
      
      NetInfo.fetch().then(async state => {
        
        const db = await SQLite.openDatabase("shopperHostDB");

        let deviceLanguage =
        Platform.OS === "ios"
          ? NativeModules.SettingsManager.settings.AppleLocale
          : NativeModules.I18nManager.localeIdentifier;

        await db.transaction(tx => {
          tx.executeSql(
            "create table if not exists setting (id integer primary key not null, language text unique);"
          );
        });
  
        await db.transaction(tx => {
          tx.executeSql(`select * from setting`, [], async (tx, set) => {
            
            if(set.rows._array[0].language){
              const langu = set.rows._array[0].language
              
              if (langu.includes("ar")) {
                changeLanguage("AR");
              } else if (langu.includes("en")) {
                changeLanguage("EN");
              } else if (langu.includes("de")) {
                changeLanguage("DE");
              } else if (langu.includes("ru")) {
                changeLanguage("RU");
              } else {
                changeLanguage("TR");
              }
            } else {
              if(!deviceLanguage){
                deviceLanguage = "tr_TR"
              }
              await db.transaction(tx => {
                tx.executeSql(`insert into setting (language) values(?)`, [
                  deviceLanguage
                ]);
              });
            }
            console.log("db language --: ", set.rows._array[0].language)
          });
        });

        if (state.isConnected) {
          //If the device has internet connection...
        } else {
          return (
            <View>
              <Text>Please Check Your Internet Connection!</Text>
              <ActivityIndicator size="large" color="#00ff00" />
            </View>
          );
        }
      });

      setTimeout(() => {
        navigation.navigate("Cities",{lang:state.language});
      }, 2000);
    }
    if (counter > 1) {
      setCounter(1);
      BackHandler.exitApp();
    }
  }, [counter]);

  const timeoutMessage = () => {
    setTimeout(() => {}, 2500);
    return message;
  };

  return (
    <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
      <NavigationEvents
        onWillFocus={() => {
          console.log("--ONWILLFOCUS...");
          setCounter(counter + 1);
        }}
      />
      <Text> {timeoutMessage()}</Text>
    </SafeAreaView>
  );
};

OpenningScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <View style={{ marginRight: 10 }}>
        <Text>{navigation.getParam("lang")}</Text>
      </View>
    )
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    borderColor: "red",
    borderWidth: 0,
    marginBottom: 200
  }
});

export default OpenningScreen;
