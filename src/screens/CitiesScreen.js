import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  Dimensions,
  StyleSheet
} from "react-native";
//import AsyncStorage from '@react-native-community/async-storage'
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import NetInfo from "@react-native-community/netinfo";
import axiosInstance from "../api/axiosInstance";
import LanguageContext from "../contexts/LanguageContext";
import { MaterialIcons } from "@expo/vector-icons";
import SafeAreaView from "react-native-safe-area-view";

const CitiesScreen = ({ navigation }) => {
  const widthOfScreen = Dimensions.get("window").width;
  const heightOfScreen = Dimensions.get("window").height;
  const [cities, setCities] = useState([]);
  const { state } = useContext(LanguageContext);
  const [connection, setConnection] = useState(false);

  useEffect(() => {
    navigation.navigate("Cities", { lang: state.language });

    NetInfo.fetch().then(async state => {
      if (state.isConnected) {

        setConnection(true)
        const result = await axiosInstance.get("/sehirler");
        
        if (result.data) {
          await setCities(result.data);
        }
      }
    });
  }, []);

  return (
    <SafeAreaView forceInset={{ top: "never" }}>
      {connection ? null : (
        <View
          style={{
            width:widthOfScreen,
            position: "absolute",
            zIndex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <ActivityIndicator size="large" color="#00ff00" />
          <Text style={{color:"black", fontWeight:"bold"}}>Please Check Your Internet Connection!</Text>
        </View>
      )}
      <FlatList
        data={cities}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => {
          return item.sehir;
        }}
        renderItem={({ item }) => {
          //let source=`../../assets/images/sehirler/${item.sehir}.jpg`
          let source;
          switch (item.sehir.toLowerCase()) {
            case "istanbul":
              source = require("../../assets/images/sehirler/istanbul.jpg");
              break;
            case "ankara":
              source = require("../../assets/images/sehirler/ankara.jpg");
              break;
            case "izmir":
              source = require("../../assets/images/sehirler/izmir.jpg");
              break;
            case "trabzon":
              source = require("../../assets/images/sehirler/trabzon.jpg");
              break;
            case "bursa":
              source = require("../../assets/images/sehirler/bursa.jpg");
              break;
            case "yalova":
              source = require("../../assets/images/sehirler/yalova.jpg");
              break;
            case "sakarya":
              source = require("../../assets/images/sehirler/sakarya.jpg");
              break;
            default:
              source = require("../../assets/images/sehirler/aCity.jpg");
          }

          return (
            <View style={{ marginBottom: 10, marginTop: 10 }}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  navigation.navigate("Category", { sehir: item.sehir });
                }}
              >
                <View
                  style={{ flex: 1, alignSelf: "center", position: "relative" }}
                >
                  <Image
                    style={{
                      borderRadius: 10,
                      width: widthOfScreen * 0.95,
                      height: heightOfScreen * 0.2
                    }}
                    source={source}
                  />
                  <Text
                    style={{
                      position: "absolute",
                      top: heightOfScreen * 0.1,
                      // left: widthOfScreen * 0.35,
                      alignSelf: "center",
                      fontWeight: "bold",
                      color: "white",
                      zIndex: 1,
                      fontSize: 24
                    }}
                  >
                    {item.sehir.charAt(0).toUpperCase() +
                      item.sehir.substring(1)}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

CitiesScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Settings");
        }}
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
          <MaterialIcons name="settings" style={{ color: "grey" }} size={30} />
        </View>
      </TouchableOpacity>
    )
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

export default CitiesScreen;
