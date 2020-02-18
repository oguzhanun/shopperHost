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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Linking } from "expo";

const OpenningScreen = ({ navigation }) => {
  const [counter, setCounter] = useState(0);
  const { changeLanguage } = useContext(LanguageContext);
  const widthOfScreen = Dimensions.get("window").width;
  const heightOfScreen = Dimensions.get("window").height;
  console.log(widthOfScreen, heightOfScreen);
  const buttonWidth = widthOfScreen
  const buttonHeight = heightOfScreen * 0.05;
  console.log("buttonHeight : ", buttonHeight)
  const [connection, setConnection] = useState(false);
  
  useEffect(() => {
    if (counter <= 1) {
      NetInfo.fetch().then(async state => {
        if (state.isConnected) {
          console.log("Internet Connection Is Established...");
          setConnection(state.isConnected);
        }
        let deviceLanguage =
          Platform.OS === "ios"
            ? NativeModules.SettingsManager.settings.AppleLocale
            : NativeModules.I18nManager.localeIdentifier;
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
        borderWidth: 0, 
        borderColor: "green" }}>
        <Image
          style={{
            borderColor:"red",
            borderWidth:0,
            resizeMode: "cover",
            width : widthOfScreen,
            height:heightOfScreen - heightOfScreen * 0.085,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0
          }}
          source={require("../../assets/OpeningScreen.png")}
        />
      </View>
    </SafeAreaView>
  );
};

OpenningScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        onPress={() => {
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
