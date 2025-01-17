import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, Dimensions } from "react-native";
import axiosInstance from "../api/axiosInstance";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import NetInfo from "@react-native-community/netinfo";
import LanguageContext from "../contexts/LanguageContext";
import { NavigationEvents } from "react-navigation";
import { MaterialIcons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Linking } from "expo";
import { Rating } from "react-native-elements";
import SafeAreaView from "react-native-safe-area-view";

const ShopsScreen = ({ navigation }) => {
  const [shops, setShops] = useState([]);
  const [sehir, setSehir] = useState([]);
  const [category, setCategory] = useState([]);
  const { state } = useContext(LanguageContext);
  const widthOfScreen = Dimensions.get("window").width;
  const heightOfScreen = Dimensions.get("window").height;
  const [propagation, setPropagation] = useState(true)
  const [active, setActivity] = useState(true)
  const [shopsPosition, setShopsPosition] = useState();

  useEffect(() => {
    NetInfo.fetch().then(async state => {
      if (state.isConnected) {
        const { sehir, kategori } = navigation.getParam("data");
        if (sehir) {
          await setSehir(sehir);
        }
        if (kategori) {
          await setCategory(kategori);
        }
        const result = await axiosInstance.get(
          `/dukkanlar/${sehir}/${kategori}`
        );
        const result2 = await axiosInstance.get(`/dukkanKonumlari/${sehir}/${kategori}`)
        if(result2.data){
          setShopsPosition(result2.data)
        }
        if (result.data) {
          await setShops(result.data);
        }
      } 
    });
  }, [propagation]);

return (
    <SafeAreaView forceInset={{top:"never"}} style={{flex:1, marginTop: 10 }}> 
      <NavigationEvents
        onDidFocus={() => {
          setPropagation(true)
          setActivity(true)
        }}
        onDidBlur={()=>{
          setActivity(false)
        }}
      />
      <FlatList
        data={shops}
        keyExtractor={item => {
          return item.isim;
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View style={{ marginBottom: 5, flex: 1 }}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  if(propagation)
                  navigation.navigate("Info", {
                    data: {
                      shopId: item.id
                    }
                  })
                }}
              >
                <View
                  style={{
                    marginBottom: 10,
                    backgroundColor: "white",
                    flex: 1,
                    borderColor: "black",
                    borderRadius: 10,
                    borderWidth: 0,
                    flexDirection: "row",
                    marginHorizontal: 10
                  }}
                >
                  <Image
                    style={{
                      resizeMode: "cover",
                      borderWidth: 0,
                      width: widthOfScreen * 0.364,
                      height: heightOfScreen * 0.16,
                      borderRadius: 10,
                      marginHorizontal: 10,
                      marginVertical: 10
                    }}
                    source={{ uri: `http://37.247.107.18:1818${item.resim1}` }} //37.247.107.18:1818
                  />
                  <View
                    style={{
                      alignItems: "flex-start",
                      marginVertical: 10,
                      justifyContent: "space-evenly",
                      borderColor: "black",
                      flex: 1,
                      paddingTop: 0,
                      borderLeftWidth: 0
                    }}
                  >
                    <Text
                      style={{
                        marginLeft: 10,
                        fontSize: 16,
                        color: "#397DC6",
                        fontWeight: "bold"
                      }}
                    >
                      {item.isim ? item.isim.charAt(0).toUpperCase() +
                        item.isim.substring(1) : null}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        Linking.openURL(`tel:${item.telefon}`);
                      }}
                    >
                      <View>
                        {item.telefon ? (
                          <View style={{ flexDirection: "row" }}>
                            <MaterialIcons
                              style={{ marginLeft: 10, paddingTop: 3 }}
                              color="green"
                              size={16}
                              name="phone"
                            />
                            <Text
                              style={{
                                marginLeft: 5,
                                color: "black",
                                fontWeight: "bold"
                              }}
                            >
                              {item.telefon}
                            </Text>
                          </View>
                        ) : (
                          <View>
                            <Text
                              style={{
                                marginLeft: 5,
                                color: "black",
                                fontWeight: "bold"
                              }}
                            >
                              {item.telefon}
                            </Text>
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                    <View
                      style={{
                        borderColor: "red",
                        borderWidth: 0,
                        marginLeft: 10,
                        flexDirection: "row",
                        width: widthOfScreen * 0.46,
                        alignItems: "center",
                        justifyContent: "space-between"
                      }}
                    >
                      <View
                        style={{
                          borderColor: "green",
                          borderWidth: 0,
                          alignItems: "center",
                          flexDirection: "row",
                          zIndex:10
                        }}
                      >
                        <Rating
                          cancelable
                          onStartRating={() => {
                            return null
                          }}
                          startingValue={item.rating}
                          fractions={20}
                          imageSize={16}
                          onFinishRating={() => {
                            return null
                          }}
                        />
                          <Text style={{ marginLeft: 5, fontSize: 12 }}>
                            ({item.rating != null ? parseFloat(item.rating).toFixed(2) : null })
                          </Text>
                      </View>
                      <View
                        style={{
                          backgroundColor: "#ccc",
                          borderRadius: 5,
                          padding: 4,
                          justifyContent: "flex-end",
                          alignSelf: "flex-end",
                          borderColor: "red",
                          borderWidth: 0
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            const scheme = Platform.select({
                              ios: "maps:0,0?q=",
                              android: "geo:0,0?q="
                            });
                            const latLng = `${item.konum}`;
                            const label = `${item.isim}`;
                            const url = Platform.select({
                              ios: `${scheme}${label}@${latLng}`,
                              android: `${scheme}${latLng}(${label})`    //42.56,39.44
                            });
                            Linking.openURL(url);
                          }}
                        >
                          <Feather
                            color="#397DC6"
                            name="navigation"
                            size={24}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <View style={{position: "absolute",
              zIndex: 1,
              bottom: 10,
              right: 10}}>
        <TouchableOpacity onPress={()=>{
          if(active)
          navigation.navigate("Map",{shopsPosition})
        }}>
          <MaterialCommunityIcons
            name="map-marker-multiple"
            color="#43862F"
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

ShopsScreen.navigationOptions = ( ) => {
  return {
    headerRight: () => (
      <View style={{flexDirection:"row", justifyContent:"space-between"}}>
        <TouchableOpacity
          onPress={() => {
            Linking.canOpenURL("https://wa.me/905383505515").then(
              supported => {
                if (supported) {
                  Linking.openURL("https://wa.me/905383505515");
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
      </View>
    ),
    headerTitle: (
      <Text style={{ color: "#43862F", fontWeight: "bold", fontSize: 22 }}>
     
      </Text>
    )
  };
};

export default ShopsScreen;
