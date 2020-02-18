import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, Dimensions, ActivityIndicator } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import axiosInstance from "../api/axiosInstance";
import NetInfo from "@react-native-community/netinfo";
import LanguageContext from "../contexts/LanguageContext";
import { NavigationEvents } from "react-navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SafeAreaView from "react-native-safe-area-view";
import { Linking } from "expo";

const CategoryScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [shopsPosition, setShopsPosition] = useState();
  const [sehir, setSehir] = useState([]);
  const { state } = useContext(LanguageContext);
  const [language, setLanguage] = useState(state.language);
  const widthOfScreen = Dimensions.get("window").width;
  const heightOfScreen = Dimensions.get("window").height;
  const [connection, setConnection] = useState(false);
  const [foto, setFoto] = useState("fotograf");
  const [kategoriLang, setKategoriLang] = useState("kategori_adi");

  useEffect(() => {
    NetInfo.fetch().then(async state => {
      if (state.isConnected) {
        setConnection(true);
        const { sehir } = navigation.getParam("data");
        if (sehir) {
          await setSehir(sehir);
          navigation.navigate("Category", { sehir });
        }
        switch (language) {
          case "TR":
            setKategoriLang("kategori_adi");
            setFoto("fotograf");
            break;
          case "EN":
            setKategoriLang("kategori_adi_EN");
            setFoto("fotograf_EN");
            break;
          case "AR":
            setKategoriLang("kategori_adi_AR");
            setFoto("fotograf_AR");
            break;
          case "DE":
            setKategoriLang("kategori_adi_DE");
            setFoto("fotograf_DE");
            break;
          case "RU":
            setKategoriLang("kategori_adi_RU");
            setFoto("fotograf_RU");
            break;
          default:
            setKategoriLang("kategori_adi");
            setFoto("fotograf");
        }
        const result = await axiosInstance.get(
          `/kategoriler/${kategoriLang}/${sehir}`
        );
        const result2 = await axiosInstance.get(`/dukkanKonumlari/${sehir}`);
        if (result2.data) {
          setShopsPosition(result2.data);
        }
        if (result.data) {
          setCategories(result.data);
        }
      }
    });
  }, [language]);

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 5 }}>
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
                      let specialHeight = heightOfScreen * 0.25;
                      return (
                        <View
                          key={kat.kategori_adi.toString()}
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
                                  kategori: kat.kategori_adi
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
                                  height: specialHeight
                                }}
                                source={{
                                  uri: `http://37.247.107.18:1818${kat[foto]}`
                                }}
                              />
                              <Text
                                style={{
                                  fontWeight: "bold",
                                  color: "white",
                                  zIndex: 1,
                                  backgroundColor: "#43862F",
                                  paddingHorizontal: widthOfScreen * 0.0243,
                                  paddingVertical: heightOfScreen * 0.00365,
                                  borderBottomLeftRadius: 4,
                                  borderBottomRightRadius: 4,
                                  width: widthOfScreen * 0.485
                                }}
                              >
                                {kat[kategoriLang]}
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
                      let specialHeight = heightOfScreen * 0.25;
                      return (
                        <View
                          key={kat.kategori_adi.toString()}
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
                                  kategori: kat.kategori_adi
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
                                  height: specialHeight
                                }}
                                source={{
                                  uri: `http://37.247.107.18:1818${kat[foto]}`
                                }}
                              />
                              <Text
                                style={{
                                  fontWeight: "bold",
                                  color: "white",
                                  zIndex: 1,
                                  backgroundColor: "#43862F",
                                  paddingHorizontal: widthOfScreen * 0.0243,
                                  paddingVertical: heightOfScreen * 0.00365,
                                  borderBottomLeftRadius: 4,
                                  borderBottomRightRadius: 4,
                                  width: widthOfScreen * 0.485
                                }}
                              >
                                {kat[kategoriLang]}
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
      <View style={{ position: "absolute", zIndex: 1, bottom: 10, right: 10 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Map", { shopsPosition });
          }}
        >
          <MaterialCommunityIcons
            name="map-marker-multiple"
            color="#4E9A32"
            size={50}
            style={{
              backgroundColor: "transparent",
              borderBottomColor: "white",
              padding: 0,
              borderBottomWidth: 2,
              borderRadius: 10
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
          <MaterialCommunityIcons name="whatsapp" color="#43862F" size={38} />
        </View>
      </TouchableOpacity>
    ),
    headerTitle: (
      <Text style={{ color: "#43862F", fontWeight: "bold", fontSize: 22 }}>
        {navigation.getParam("sehir")}
      </Text>
    )
  };
};

export default CategoryScreen;