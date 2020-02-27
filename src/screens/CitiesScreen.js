import React, { useContext, useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  Image,
  Dimensions,
  Alert
} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import NetInfo from "@react-native-community/netinfo";
import axiosInstance from "../api/axiosInstance";
import LanguageContext from "../contexts/LanguageContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SafeAreaView from "react-native-safe-area-view";
import { Linking } from "expo";
import { NavigationEvents } from "react-navigation";

const CitiesScreen = ({ navigation }) => {
  const widthOfScreen = Dimensions.get("window").width;
  const heightOfScreen = Dimensions.get("window").height;
  const [cities, setCities] = useState([]);
  const { state } = useContext(LanguageContext);
  const [connection, setConnection] = useState(false);
  // const [ajax,setAjax] = useState(false)

  useEffect(() => {
    NetInfo.fetch().then(async state => {
      if (state.isConnected) {
        setConnection(true);
        const result = await axiosInstance.get("/sehirler");
        console.log(result.data)
        //setAjax(false)
        if (result.data) {
          await setCities(result.data);
          // setAjax(true)
        }
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
                  {cities ? cities.slice(0, Math.ceil(cities.length / 2))
                    .map(city => {
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
                                  height: specialHeight
                                }}
                                source={{uri: `http://37.247.107.18:1818${city.fotograf}`}}
                              />
                            </View>
                          </TouchableOpacity>
                        </View>
                      );
                    }) : null}
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
                            onPress={ () => {
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
                                  height: specialHeight
                                }}
                                source={{uri: `http://37.247.107.18:1818${city.fotograf}`}}
                              />
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
      {/* <NavigationEvents
        onDidFocus={()=>{
          if(!ajax){
            setAjax(true)
          }
        }}
      /> */}
    </SafeAreaView>
  );
};

CitiesScreen.navigationOptions = ( ) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        onPress={() => {
          Linking.canOpenURL("https://wa.me/905383505515").then(
            supported => {
              if (supported) {
                Linking.openURL("https://wa.me/905383505515"); //whatsapp://send?phone=+905383505515
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
    )
  };
};

export default CitiesScreen;