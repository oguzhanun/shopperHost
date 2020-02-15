import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  PanResponder,
  ActivityIndicator,
  Platform
} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import axiosInstance from "../api/axiosInstance";
import NetInfo from "@react-native-community/netinfo";
import LanguageContext from "../contexts/LanguageContext";
import { NavigationEvents } from "react-navigation";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import SafeAreaView from "react-native-safe-area-view";
import { Linking } from "expo";
import { Header } from "react-native/Libraries/NewAppScreen";

const CategoryScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [shopsPosition, setShopsPosition] = useState();
  const [sehir, setSehir] = useState([]);
  const { state } = useContext(LanguageContext);
  const [language, setLanguage] = useState(state.language);
  const widthOfScreen = Dimensions.get("window").width;
  const heightOfScreen = Dimensions.get("window").height;
  const [connection, setConnection] = useState(false);

  const responder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) =>
      Platform.OS === "ios" ? false : true,
    onPanResponderMove: (evt, gestureState) => {
      return Platform.OS === "ios" ? false : true;
    },
    onPanResponderTerminationRequest: (evt, gestureState) =>
      Platform.OS === "ios" ? false : true
  });

  useEffect(() => {
    NetInfo.fetch().then(async state => {
      if (state.isConnected) {
        setConnection(true);

        const sehir = navigation.getParam("sehir");

        if (sehir) {
          await setSehir(sehir);
        }

        let kategori = "kategori";

        //Dil seçeneğine bağlı olarak yapılacak http talebi değişiyor.
        //Şu an bu değişime ihtiyaç yok.
        switch (language) {
          case "TR":
            kategori = "kategori";
            break;
          case "EN":
            kategori = "kategoriEN";
            break;
          case "AR":
            kategori = "kategoriAR";
            break;
          case "DE":
            kategori = "kategoriDE";
            break;
          case "RU":
            kategori = "kategoriRU";
            break;
          default:
            kategori = "kategori";
        }

        const result = await axiosInstance.get(
          `/kategoriler/${kategori}/${sehir}`
        );

        const result2 = await axiosInstance.get(`/dukkanKonumlari/${sehir}`)
        
        if(result2.data){
          setShopsPosition(result2.data)
        }

        if (result.data) {
          setCategories(result.data);
          console.log("YENI KATEGORILER : ", result.data);
        }
      }
    });
  }, [language]);

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 5 }} {...responder.panHandlers}>
      <NavigationEvents
        onDidFocus={() => {
          setLanguage(state.language);
        }}
      />
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
                  {categories
                    .slice(0, Math.ceil(categories.length / 2))
                    .map(kat => {
                      let source;
                      let specialHeight;
                      switch (kat.kategori.toLowerCase().replace(" ", "")) {
                        case "mobilya":
                          source = require("../../assets/images/kategoriler/mobilya.jpg");
                          specialHeight = heightOfScreen * 0.25;
                          break;
                        case "çikolata":
                          source = require("../../assets/images/kategoriler/cikolata.jpg");
                          specialHeight = heightOfScreen * 0.25;
                          break;
                        case "genelalışveriş":
                          source = require("../../assets/images/kategoriler/genel.jpg");
                          specialHeight = heightOfScreen * 0.25;
                          break;
                        case "turistik":
                          source = require("../../assets/images/kategoriler/geziyeri.jpg");
                          specialHeight = heightOfScreen * 0.25;
                          break;
                        case "hediyelik":
                          source = require("../../assets/images/kategoriler/hediyelik.jpg");
                          specialHeight = heightOfScreen * 0.25;
                          break;
                        case "mücevher":
                          source = require("../../assets/images/kategoriler/mucevher.jpg");
                          specialHeight = heightOfScreen * 0.25;
                          break;
                        case "giyim":
                          source = require("../../assets/images/kategoriler/giyim.jpg");
                          specialHeight = heightOfScreen * 0.25;
                          break;
                        case "züccaciye":
                          source = require("../../assets/images/kategoriler/zuccaciye.jpg");
                          specialHeight = heightOfScreen * 0.25;
                          break;
                        default:
                          source = require("../../assets/images/kategoriler/genel.jpg");
                          specialHeight = heightOfScreen * 0.25;
                      }
                      return (
                        <View
                          key={source.toString()}
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
                              navigation.navigate("Shops", {
                                data: {
                                  sehir: sehir,
                                  kategori: kat.kategori
                                }
                              });
                            }}
                          >
                            <View style={{ margin: 5 }}>
                              <Image
                                style={{
                                  resizeMode: "stretch",
                                  borderTopLeftRadius: 4,
                                  borderTopRightRadius: 4,
                                  width: widthOfScreen * 0.485,
                                  height: specialHeight //heightOfScreen * 0.2
                                }}
                                source={source}
                              />
                              <Text
                                style={{
                                  fontWeight: "bold",
                                  color: "white",  //gold
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
                              </Text>
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
                  {categories
                    .slice(Math.ceil(categories.length / 2), categories.length)
                    .map(kat => {
                      let source;
                      let specialHeight;
                      let specialWidth;
                      switch (kat.kategori.toLowerCase().replace(" ", "")) {
                        case "mobilya":
                          source = require("../../assets/images/kategoriler/mobilya.jpg");
                          specialHeight = heightOfScreen * 0.25;
                          specialWidth = widthOfScreen * 0.45;
                          break;
                        case "çikolata":
                          source = require("../../assets/images/kategoriler/cikolata.jpg");
                          specialHeight = heightOfScreen * 0.25;
                          specialWidth = widthOfScreen * 0.45;
                          break;
                        case "genelalışveriş":
                          source = require("../../assets/images/kategoriler/genel.jpg");
                          specialHeight = heightOfScreen * 0.25;
                          specialWidth = widthOfScreen * 0.45;
                          break;
                        case "turistik":
                          source = require("../../assets/images/kategoriler/geziyeri.jpg");
                          specialHeight = heightOfScreen * 0.25;
                          specialWidth = widthOfScreen * 0.45;
                          break;
                        case "hediyelik":
                          source = require("../../assets/images/kategoriler/hediyelik.jpg");
                          specialHeight = heightOfScreen * 0.25;
                          specialWidth = widthOfScreen * 0.45;
                          break;
                        case "mücevher":
                          source = require("../../assets/images/kategoriler/mucevher.jpg");
                          specialHeight = heightOfScreen * 0.25;
                          specialWidth = widthOfScreen * 0.45;
                          break;
                        case "giyim":
                          source = require("../../assets/images/kategoriler/giyim.jpg");
                          specialHeight = heightOfScreen * 0.25;
                          specialWidth = widthOfScreen * 0.45;
                          break;
                        case "züccaciye":
                          source = require("../../assets/images/kategoriler/zuccaciye.jpg");
                          specialHeight = heightOfScreen * 0.25;
                          specialWidth = widthOfScreen * 0.45;
                          break;
                        default:
                          source = require("../../assets/images/kategoriler/genel.jpg");
                          specialHeight = heightOfScreen * 0.25;
                          specialWidth = widthOfScreen * 0.45;
                      }
                      return (
                        <View
                          key={source.toString()}
                          style={{ borderColor: "green", borderWidth: 0 }}
                        >
                          <TouchableOpacity
                            style={{ borderColor: "red", borderWidth: 0 }}
                            activeOpacity={0.8}
                            onPress={Event => {
                              console.log("PROPS----->", Event);
                              navigation.navigate("Shops", {
                                data: {
                                  sehir: sehir,
                                  kategori: kat.kategori
                                }
                              });
                            }}
                          >
                            <View style={{ margin: 5 }}>
                              {/* <Text>{kat.kategori}</Text> */}
                              <Image
                                style={{
                                  resizeMode: "stretch",
                                  borderTopLeftRadius: 4,
                                  borderTopRightRadius: 4,
                                  width: widthOfScreen * 0.485,
                                  height: specialHeight
                                }}
                                source={source}
                              />
                              <Text
                                style={{
                                  fontWeight: "bold",
                                  color: "white", //gold
                                  zIndex: 1,
                                  backgroundColor: "#43862F",  //#aaa
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
                              </Text>
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
      <View style={{position: "absolute",
              zIndex: 1,
              bottom: 10,
              right: 10}}>
        <TouchableOpacity onPress={()=>{
          navigation.navigate("Map", {shopsPosition})
        }}>
          <MaterialCommunityIcons
            name="map-marker-multiple"
            color="#4E9A32"
            size={50}
            style={{
              backgroundColor: "transparent",
              borderBottomColor:"white",
              padding:0,
              borderBottomWidth:2,
              borderRadius: 10,
              
            }}
          />
        </TouchableOpacity>
      </View>
      
      
    </SafeAreaView>
  );
};

CategoryScreen.navigationOptions = ({ navigation }) => {
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
};

export default CategoryScreen;
