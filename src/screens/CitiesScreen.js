import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  Dimensions,
  StyleSheet,
  Alert
} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import NetInfo from "@react-native-community/netinfo";
import axiosInstance from "../api/axiosInstance";
import LanguageContext from "../contexts/LanguageContext";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import SafeAreaView from "react-native-safe-area-view";
import { Linking } from "expo";

const CitiesScreen = ({ navigation }) => {
  const widthOfScreen = Dimensions.get("window").width;
  const heightOfScreen = Dimensions.get("window").height;
  const [cities, setCities] = useState([]);
  const { state } = useContext(LanguageContext);
  const [connection, setConnection] = useState(false);

  useEffect(() => {
    //navigation.navigate("Cities", { lang: state.language });

    NetInfo.fetch().then(async state => {
      if (state.isConnected) {
        setConnection(true);
        const result = await axiosInstance.get("/sehirler");

        if (result.data) {
          await setCities(result.data);
          
        }

        console.log("SEHİRLER",cities)
      }
    });
  }, []);

  return (
    <SafeAreaView forceInset={{ top: "never" }}>
      {connection ? null : (
        <View
          style={{
            width: widthOfScreen,
            position: "absolute",
            zIndex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <ActivityIndicator size="large" color="#00ff00" />
          <Text style={{ color: "black", fontWeight: "bold" }}>
            Please Check Your Internet Connection!
          </Text>
        </View>
      )}


      <FlatList
        data={[{ category: "hi" }]}
        keyExtractor={item => {
          return "item.kategori;";
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flex: 1,
                borderColor: "blue",
                borderWidth: 0
              }}
            >
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View
                  style={{
                    flex: 0.5,
                    flexDirection: "column",
                    borderColor: "red",
                    borderWidth: 0,
                    justifyContent: "flex-start",
                    alignItems: "center"
                  }}
                >
                  {cities
                    .slice(0, Math.ceil(cities.length / 2))
                    .map(city => {
                      let source;
                      let specialHeight = heightOfScreen * 0.25
                      
                      return (
                        <View
                          key={city.sehir_adi.toString()}
                          style={{
                            borderColor: "green",
                            borderWidth: 0,
                            flex: 1
                          }}
                        >
                          <TouchableOpacity
                            style={{ borderColor: "red", borderWidth: 0 }}
                            activeOpacity={0.8}
                            onPress={() => {
                              console.log(View.props);
                              navigation.navigate("Category", {
                                data: {
                                  sehir: city.sehir_adi
                                }
                              });
                            }}
                          >
                            <View style={{ margin: 5 }}>
                              <Image
                                style={{
                                  resizeMode: "cover",
                                  borderTopLeftRadius: 4,
                                  borderTopRightRadius: 4,
                                  width: widthOfScreen * 0.485,
                                  height: specialHeight //heightOfScreen * 0.2
                                }}
                                source={{uri: `http://192.168.1.8:3001${city.fotograf}`}}
                              />
                              {/* <Text
                                style={{
                                  fontWeight: "bold",
                                  color: "white", //gold
                                  zIndex: 1,
                                  backgroundColor: "#43862F", //#aaa
                                  paddingHorizontal: widthOfScreen * 0.0243,
                                  paddingVertical: heightOfScreen * 0.00365,
                                  borderBottomLeftRadius: 4,
                                  borderBottomRightRadius: 4,
                                  width: widthOfScreen * 0.485
                                }}
                              >
                                {kat.kategoriAR
                                  ? kat.kategoriAR.charAt(0).toUpperCase() +
                                    kat.kategoriAR.substring(1)
                                  : null || kat.kategoriDE
                                  ? kat.kategoriDE.charAt(0).toUpperCase() +
                                    kat.kategoriDE.substring(1)
                                  : null || kat.kategoriEN
                                  ? kat.kategoriEN.charAt(0).toUpperCase() +
                                    kat.kategoriEN.substring(1)
                                  : null || kat.kategoriRU
                                  ? kat.kategoriRU.charAt(0).toUpperCase() +
                                    kat.kategoriRU.substring(1)
                                  : null || kat.kategori
                                  ? kat.kategori.charAt(0).toUpperCase() +
                                    kat.kategori.substring(1)
                                  : null}
                              </Text> */}
                            </View>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                </View>
                <View
                  style={{
                    flex: 0.5,
                    flexDirection: "column",
                    borderColor: "green",
                    borderWidth: 0,
                    justifyContent: "flex-start",
                    alignItems: "center"
                  }}
                >
                  {cities
                    .slice(Math.ceil(cities.length / 2), cities.length)
                    .map(city => {
                      let specialHeight = heightOfScreen * 0.25
                   
                      return (
                        <View
                          key={city.sehir_adi.toString()}
                          style={{ borderColor: "green", borderWidth: 0 }}
                        >
                          <TouchableOpacity
                            style={{ borderColor: "red", borderWidth: 0 }}
                            activeOpacity={0.8}
                            onPress={Event => {
                              console.log("PROPS----->", Event);
                              navigation.navigate("Category", {
                                data: {
                                  sehir: city.sehir_adi
                                }
                              });
                            }}
                          >
                            <View style={{ margin: 5 }}>
                              {/* <Text>{kat.kategori}</Text> */}
                              <Image
                                style={{
                                  resizeMode: "cover",
                                  borderTopLeftRadius: 4,
                                  borderTopRightRadius: 4,
                                  width: widthOfScreen * 0.485,
                                  height: specialHeight
                                }}
                                source={{uri: `http://192.168.1.8:3001${city.fotograf}`}}
                              />
                              {/* <Text
                                style={{
                                  fontWeight: "bold",
                                  color: "white", //gold
                                  zIndex: 1,
                                  backgroundColor: "#43862F", //#aaa
                                  paddingHorizontal: widthOfScreen * 0.0243,
                                  paddingVertical: heightOfScreen * 0.00365,
                                  borderBottomLeftRadius: 4,
                                  borderBottomRightRadius: 4,
                                  width: widthOfScreen * 0.485
                                }}
                              >
                                {kat.kategoriAR
                                  ? kat.kategoriAR.charAt(0).toUpperCase() +
                                    kat.kategoriAR.substring(1)
                                  : null || kat.kategoriDE
                                  ? kat.kategoriDE.charAt(0).toUpperCase() +
                                    kat.kategoriDE.substring(1)
                                  : null || kat.kategoriEN
                                  ? kat.kategoriEN.charAt(0).toUpperCase() +
                                    kat.kategoriEN.substring(1)
                                  : null || kat.kategoriRU
                                  ? kat.kategoriRU.charAt(0).toUpperCase() +
                                    kat.kategoriRU.substring(1)
                                  : null || kat.kategori
                                  ? kat.kategori.charAt(0).toUpperCase() +
                                    kat.kategori.substring(1)
                                  : null}
                              </Text> */}
                            </View>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                </View>
              </View>
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
          {/* <MaterialIcons name="settings" style={{ color: "grey" }} size={30} /> */}
          <MaterialCommunityIcons name="whatsapp" color="#43862F" size={38} />
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

{
  /* <FlatList
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
      /> */
}
