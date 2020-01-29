import React, { useState, useEffect, useContext } from "react";
import { View, Text, Button, Image, Dimensions } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import axiosInstance from "../api/axiosInstance";
import NetInfo from "@react-native-community/netinfo";
import LanguageContext from "../contexts/LanguageContext";
import { NavigationEvents } from "react-navigation";
import { MaterialIcons } from "@expo/vector-icons";

const CategoryScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [sehir, setSehir] = useState([]);
  const { state } = useContext(LanguageContext);
  const [language, setLanguage] = useState(state.language);

  const widthOfScreen = Dimensions.get("window").width;
  const heightOfScreen = Dimensions.get("window").height;

  useEffect(() => {
    navigation.navigate("Category", { lang: state.language });

    NetInfo.fetch().then(async state => {
      if (state.isConnected) {
        const sehir = navigation.getParam("sehir");

        if (sehir) {
          await setSehir(sehir);
        }

        let kategori = "kategori";

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

        if (result.data) {
          let dataAdjusted = result.data;

          switch (language) {
            case "TR":
              dataAdjusted = result.data;
              break;
            case "EN":
              dataAdjusted = result.data.map(dat => {
                if (dat.kategoriEN) dat.kategori = dat.kategoriEN;
                delete dat.kategoriEN;
                return dat;
              });
              break;
            case "AR":
              dataAdjusted = result.data.map(dat => {
                if (dat.kategoriAR) dat.kategori = dat.kategoriAR;
                delete dat.kategoriAR;
                return dat;
              });
              break;
            case "DE":
              dataAdjusted = result.data.map(dat => {
                if (dat.kategoriDE) dat.kategori = dat.kategoriDE;
                delete dat.kategoriDE;
                return dat;
              });
              break;
            case "RU":
              dataAdjusted = result.data.map(dat => {
                if (dat.kategoriRU) dat.kategori = dat.kategoriRU;
                delete dat.kategoriRU;
                return dat;
              });
              break;
            default:
              dataAdjusted = result.data;
          }

          setCategories(dataAdjusted);
          console.log("YENI KATEGORILER : ", dataAdjusted);
        }
      } else {
        return (
          <View>
            <Text>Please Check Your Internet Connection!</Text>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        );
      }
    });
  }, [language]);

  return (
    <View>
      <FlatList
        data={categories}
        keyExtractor={item => {
          return item.kategori;
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          
          return (
            <View style={{ marginBottom: 10 }}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  navigation.navigate("Shops", {
                    data: {
                      sehir: sehir,
                      kategori: item.kategori
                    }
                  });
                }}
              >
                <View
                  style={{ flex: 1, alignSelf: "flex-start",marginLeft:10, position: "relative" }}
                >
                  <Text>{item.kategori}</Text>
                  <Image
                    style={{
                      borderRadius: 10,
                      width: widthOfScreen * 0.45,
                      height: heightOfScreen * 0.2
                    }}
                    source={require("../../assets/images/kategoriler/genel.jpg")}
                  />
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <NavigationEvents
        onDidFocus={() => {
          setLanguage(state.language);
          //navigation.navigate("Category", { lang: state.language });
        }}
      />
    </View>
  );
};

CategoryScreen.navigationOptions = ({ navigation }) => {
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

export default CategoryScreen;
