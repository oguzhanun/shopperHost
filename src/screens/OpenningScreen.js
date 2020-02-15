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
//import * as SQLite from "expo-sqlite";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Linking } from "expo";

const OpenningScreen = ({ navigation }) => {
  const [counter, setCounter] = useState(0);
  const { changeLanguage } = useContext(LanguageContext);
  const widthOfScreen = Dimensions.get("window").width;
  const heightOfScreen = Dimensions.get("window").height;
  console.log(widthOfScreen, heightOfScreen);
  const buttonWidth = widthOfScreen //- widthOfScreen * 0.028;
  const buttonHeight = heightOfScreen * 0.05;
  console.log("buttonHeight : ", buttonHeight)
  const [connection, setConnection] = useState(false);
  

  useEffect(() => {
   

    if (counter <= 1) {
      NetInfo.fetch().then(async state => {
        if (state.isConnected) {
          //If the device has internet connection...
          console.log("Internet Connection Is Established...");
          setConnection(state.isConnected);
        }

        //const db = await SQLite.openDatabase("applaklak");

        let deviceLanguage =
          Platform.OS === "ios"
            ? NativeModules.SettingsManager.settings.AppleLocale
            : NativeModules.I18nManager.localeIdentifier;

        //if (Platform.OS === "ios") {
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
        // } else {
        //   try {
        //     await db.transaction(
        //       tx => {
        //         tx.executeSql(
        //           "create table if not exists ayar1 (id integer primary key not null, language TEXT unique);"
        //         );
        //       },
        //       (err, succ) => {
        //         if (err) {
        //           console.log(err);
        //         }
        //       }
        //     )

        //     // await db.transaction(tx=>{
        //     //   tx.executeSql(`delete from ayar where id= ?;`, [2])
        //     // })

        //     await db.transaction(tx => {
        //       tx.executeSql(`select * from ayar1;`, [], async (tx, set) => {

        //         if (set.rows._array[0].language) {
        //           let dbLanguage = set.rows._array[0].language;
        //           console.log("dbLanguage ----> : ", dbLanguage);
        //           changeLanguage(dbLanguage);
        //         } else {
        //           if (deviceLanguage) {
        //             let lang = deviceLanguage.split("_");
        //             changeLanguage(lang[1]);
        //             console.log("device language :", lang[1]);
        //           } else {
        //             deviceLanguage = "tr_TR";
        //             changeLanguage("TR");
        //           }
                  
        //           let lange = deviceLanguage.split("_");

        //           await db.transaction(tx => {
        //             tx.executeSql(`insert into ayar1 (language) values ('${lange[1]}');`, []
        //               );
        //           });
        //         }
        //         console.log("SET : ", set)
        //       });
        //     });
        //   } catch (e) {
        //     console.log("error : ", e);
        //   }
        // }
      });

      if (connection) {
        setTimeout(() => {
          navigation.navigate("Cities");
        }, 3000);
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
          <ActivityIndicator size="large" color="#fff" />
          <Text>Please Check Your Internet Connection!</Text>
        </View>
      )}
      <View style={{ flex: 1, 
        // alignItems:"flex-start", 
        // justifyContent:"flex-start", 
        borderWidth: 0, 
        
        borderColor: "green" }}>
        <Image
          style={{
            borderColor:"red",
            borderWidth:0,
            resizeMode: "cover",
            width : widthOfScreen,
            height:heightOfScreen - heightOfScreen * 0.085, //- buttonHeight - 60,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0
          }}
          source={require("../../assets/OpeningScreen.png")}
        />
      </View>
      {/* <TouchableOpacity onPress={() => navigation.navigate("Cities")}>
        <View
          style={{
            zIndex: 1,
            height: buttonHeight,
            marginBottom: 0,
            backgroundColor: "#eee",
            borderColor: "red",
            borderWidth: 0,
            borderRadius: 0,
            flexDirection: "row",
            width: buttonWidth,
            justifyContent: "center"
          }}
        >
          <AntDesign
            name="login"
            size={38}
            color="#43862F" //#E83F3C
            style={{ top: buttonHeight * 0.02 }}
          />
        </View>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

OpenningScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        onPress={() => {
          //navigation.navigate("Settings"); send?text=hello&
          Linking.canOpenURL("whatsapp://send?phone=+905383505515").then(
            supported => {
              if (supported) {
                Linking.openURL("whatsapp://send?phone=+905383505515");
              } else
                Alert.alert(
                  "Uyarı",
                  "Bu özelliği kullanabilmeniz için WhatsApp uygulamasını telefonunuza yüklemeniz gerekmektedir."
                );
            }
          );
        }
      }
      >
        <View
          style={{
            marginRight: 10,
            borderColor: "grey",
            borderWidth: 0,
            padding: 0,
            borderRadius: 4
          }}
        >
          {/* <Text>{navigation.getParam("lang")}</Text> */}
          {/* <MaterialIcons name="settings" style={{ color: "grey" }} size={30} /> */}
          <MaterialCommunityIcons name="whatsapp" color="#43862F" size={38} />
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    borderColor: "red",
    borderWidth: 0
  }
});

export default OpenningScreen;
