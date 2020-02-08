import React, { useEffect, useContext, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  BackHandler,
  NativeModules,
  Image,
  AsyncStorage,
  Dimensions
} from "react-native";
import { NavigationEvents } from "react-navigation";
import SafeAreaView from "react-native-safe-area-view";
import NetInfo from "@react-native-community/netinfo";
import LanguageContext from "../contexts/LanguageContext";
import * as SQLite from "expo-sqlite";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import publicIP from "react-native-public-ip";
import axios from "axios"

const OpenningScreen = ({ navigation }) => {
  const [counter, setCounter] = useState(0);
  const { changeLanguage } = useContext(LanguageContext);
  const widthOfScreen = Dimensions.get("window").width;
  const heightOfScreen = Dimensions.get("window").height;
  console.log(widthOfScreen, heightOfScreen);
  const buttonWidth = widthOfScreen - widthOfScreen * 0.0316;
  const buttonHeight = heightOfScreen * 0.08;
  const [connection, setConnection] = useState(false);
  

  useEffect(() => {
    publicIP().then(ip => {
      console.log("IP:", ip);
    });

    if (counter <= 1) {
      NetInfo.fetch().then(async state => {
        if (state.isConnected) {
          //If the device has internet connection...
          console.log("Internet Connection Is Established...");
          setConnection(state.isConnected);
        }

        const db = await SQLite.openDatabase("shopperHostDB");

        let deviceLanguage =
          Platform.OS === "ios"
            ? NativeModules.SettingsManager.settings.AppleLocale
            : NativeModules.I18nManager.localeIdentifier;

        if (Platform.OS === "ios") {
          const deviceLang = await AsyncStorage.getItem("deviceLang");

          if (deviceLang) {
            changeLanguage(deviceLang);
          } else {
            if (deviceLanguage) {
              let lang = deviceLanguage.split("_");
              changeLanguage(lang[1]);
            } else {
              changeLanguage("TR");
            }
          }
        } else {
          try {
            await db.transaction(
              tx => {
                tx.executeSql(
                  "create table if not exists setting (id integer primary key not null, language text unique);"
                );
              },
              (err, succ) => {
                if (err) {
                  console.log(err);
                }
              }
            );

            await db.transaction(tx => {
              tx.executeSql(`select * from setting`, [], async (tx, set) => {
                if (set.rows._array[0].language) {
                  let dbLanguage = set.rows._array[0].language;
                  console.log("dbLanguage ----> : ", dbLanguage);
                  changeLanguage(dbLanguage);
                } else {
                  if (deviceLanguage) {
                    let lang = deviceLanguage.split("_");
                    changeLanguage(lang[1]);
                    console.log("device language :", lang[1]);
                  } else {
                    deviceLanguage = "tr_TR";
                    changeLanguage("TR");
                  }
                  const lange = deviceLanguage.split("_");
                  await db.transaction(tx => {
                    tx.executeSql(`insert into setting (language) values (?)`, [
                      lange[1]
                    ]);
                  });
                }
              });
            });
          } catch (e) {
            console.log("error : ", e);
          }
        }
      });

      if (connection) {
        setTimeout(() => {
          navigation.navigate("Cities");
        }, 2000);
      }
    }

    if (counter > 1) {
      if (Platform.OS == "ios") {
        setCounter(2);
      } else {
        setCounter(1);
        BackHandler.exitApp();
      }
    }
  }, [counter]);

  return (
    <SafeAreaView style={styles.container} forceInset={{ top: "never" }}>
      <NavigationEvents
        onWillFocus={() => {
          console.log("--ONWILLFOCUS...");
          setCounter(counter + 1);
        }}
      />
      {connection ? null : (
        <View
          style={{
            position: "absolute",
            zIndex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <ActivityIndicator size="large" color="#00ff00" />
          <Text>Please Check Your Internet Connection!</Text>
        </View>
      )}
      <View style={{ flex: 1, borderWidth: 0, borderColor: "green" }}>
        <Image
          style={{
            resizeMode: "cover",
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5
          }}
          source={require("../../assets/OpeningScreen.png")}
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Cities")}>
        <View
          style={{
            zIndex: 1,
            height: buttonHeight,
            marginBottom: 0,
            backgroundColor: "#ccc",
            borderColor: "red",
            borderWidth: 0,
            borderRadius: 10,
            flexDirection: "row",
            width: buttonWidth,
            justifyContent: "center"
          }}
        >
          <AntDesign
            name="login"
            size={50}
            color="white"
            style={{ top: buttonHeight * 0.115 }}
          />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

OpenningScreen.navigationOptions = ({ navigation }) => {
  return {
    // headerRight: () => (
    //   <View style={{ marginRight: 10 }}>
    //     <Text>{navigation.getParam("lang")}</Text>
    //   </View>
    // )
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    borderColor: "red",
    borderWidth: 0
  }
});

export default OpenningScreen;
