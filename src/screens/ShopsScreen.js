import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, PanResponder, Dimensions } from "react-native";
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

  const responder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      return true;
    },
    onPanResponderTerminationRequest: (evt, gestureState) => true
  });

  useEffect(() => {
    //navigation.navigate("Shops", { lang: state.language });

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

        if (result.data) {
          await setShops(result.data);
          console.log("Shops Info: ", result.data);
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
  }, []);

  return (
    <SafeAreaView style={{ marginTop: 10 }} {...responder.panHandlers}>
      {/* <NavigationEvents
        onDidFocus={() => {
          navigation.navigate("Shops", { lang: state.language });
        }}
      /> */}
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
                  navigation.navigate("Info", {
                    data: {
                      shopId: item.id
                    }
                  });
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
                    source={{ uri: `http://192.168.1.8:3001${item.resim1}` }} //37.247.107.18:1818
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
                      {item.isim.charAt(0).toUpperCase() +
                        item.isim.substring(1)}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        // setTimeout(()=>{
                        //   navigation.navigate("Shops")
                        // },500)
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
                          flexDirection: "row"
                        }}
                      >
                        <Rating
                          onStartRating={() => {
                            console.log("rating started");
                          }}
                          startingValue={item.rating}
                          fractions={20}
                          imageSize={16}
                          onFinishRating={() => {
                            return null;
                          }}
                        />
                        <Text style={{ marginLeft: 5, fontSize: 12 }}>
                          ({item.rating})
                        </Text>
                      </View>
                      <View
                        style={{
                          backgroundColor: "#ccc",
                          borderRadius: 5,
                          padding: 2,
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
                              android: `${scheme}${latLng}(${label})`
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
    </SafeAreaView>
  );
};

ShopsScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <View style={{flexDirection:"row", justifyContent:"space-between"}}>
        {/* <TouchableOpacity
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
            <MaterialIcons
              name="settings"
              style={{ color: "green" }}
              size={30}
            />
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => {
            //navigation.navigate("Settings"); send?text=hello&
            Linking.canOpenURL("whatsapp://send?phone=+905555550555").then(
              supported => {
                if (supported) {
                  Linking.openURL("whatsapp://send?phone=+905555550555");
                } else
                  Alert.alert(
                    "Warning",
                    "You should install WhatsApp to use this feature."
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
            <MaterialCommunityIcons name="whatsapp" color="green" size={38} />
          </View>
        </TouchableOpacity>
      </View>
    )
  };
};

export default ShopsScreen;
