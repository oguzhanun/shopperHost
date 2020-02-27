import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Image,
  Dimensions,
  AsyncStorage,
  ScrollView
} from "react-native";
import { Card, Text, Badge } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import SafeAreaView from "react-native-safe-area-view";
import NetInfo from "@react-native-community/netinfo";
import axiosInstance from "../api/axiosInstance";
import LanguageContext from "../contexts/LanguageContext";
import Carousel, { Pagination } from "react-native-snap-carousel";
import {
  MaterialIcons,
  Feather,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import { NavigationEvents } from "react-navigation";
import { Linking } from "expo";
import { Rating } from "react-native-elements";

const InfoScreen = ({ navigation }) => {
  const [thePlace, setThePlace] = useState("null");
  const { state } = useContext(LanguageContext);
  const sliderWidth = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const [language, setLanguage] = useState(state.language);
  const itemWidth = sliderWidth;
  const [index, setIndex] = useState(0);
  const [tap, setTap] = useState({});
  
  useEffect(() => {
    NetInfo.fetch().then(async state => {
      console.log("Async Storage :", await AsyncStorage.getItem("deviceLang"));
      if (state.isConnected) {
        const { shopId } = navigation.getParam("data");
        const result = await axiosInstance.get(`/dukkan/${shopId}`);
        if (result.data) {
          let dataAdjusted = result.data;
          switch (language) {
            case "TR":
              dataAdjusted = result.data;
              break;
            case "EN":
              dataAdjusted = result.data.map(dat => {
                if (dat.bilgiEN) dat.bilgi = dat.bilgiEN;
                return dat;
              });
              break;
            case "AR":
              dataAdjusted = result.data.map(dat => {
                if (dat.bilgiAR) dat.bilgi = dat.bilgiAR;
                return dat;
              });
              break;
            case "DE":
              dataAdjusted = result.data.map(dat => {
                if (dat.bilgiDE) dat.bilgi = dat.bilgiDE;
                return dat;
              });
              break;
            case "RU":
              dataAdjusted = result.data.map(dat => {
                if (dat.bilgiRU) dat.bilgi = dat.bilgiRU;
                return dat;
              });
              break;
            default:
              dataAdjusted = result.data;
          }
          setThePlace(dataAdjusted[0]);
        }
      }
    });
  }, [language]);

  return (
    <SafeAreaView
      forceInset={{ top: "never" }}
      style={{
        flex: 1,
        borderColor: "red",
        borderWidth: 0,
        margin: 0,
        paddingTop: 0
      }}
    >
      <NavigationEvents
        onDidFocus={() => {
          navigation.navigate("Info");
          setLanguage(state.language);
        }}
      />
      <ScrollView nestedScrollEnabled={true}  showsVerticalScrollIndicator={false}>
            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
                alignContent: "center",
                borderColor: "green",
                borderWidth: 0,
                marginTop: 10,
                paddingTop: 0
              }}
            >
              <Card
                containerStyle={{
                  backgroundColor: "#efefef",
                  flex: 1,
                  marginTop: 0,
                  paddingTop: 0,
                  borderRadius: 10
                }}
              >
                <Carousel
                  removeClippedSubviews={false}
                  ref={c => setTap(c)}
                  data={[
                    { resim: thePlace.resim1 },
                    { resim: thePlace.resim2 },
                    { resim: thePlace.resim3 }
                  ]}
                  renderItem={({ item, index }) => {
                    return (
                      <View
                        style={{
                          alignItems: "center",
                          borderColor: "red",
                          borderWidth: 0,
                          marginLeft: 0,
                          marginRight: sliderWidth * 0.151,
                          paddingVertical: 10,
                          borderRadius: 5
                        }}
                      >
                        <Image
                          style={{
                            resizeMode: "contain",
                            width: sliderWidth * 0.85,
                            height: height * 0.32,
                            borderRadius: 5,
                            marginHorizontal: 0
                          }}
                          source={{
                            uri: `http://37.247.107.18:1818${item.resim}`
                          }}
                        />
                      </View>
                    );
                  }}
                  onSnapToItem={index => setIndex(index)}
                  sliderWidth={sliderWidth}
                  itemWidth={itemWidth}
                  containerCustomStyle={{
                    borderWidth: 0,
                    borderColor: "red"
                  }}
                />
                <Pagination
                  dotsLength={3}
                  dotColor="black"
                  dotStyle={{
                    width: 8,
                    height: 8,
                    borderRadius: 5,
                    marginHorizontal: 0
                  }}
                  inactiveDotColor="grey"
                  containerStyle={{
                    borderColor: "red",
                    paddingVertical: 0,
                    borderWidth: 0
                  }}
                  activeDotIndex={index}
                  tappableDots={true}
                  carouselRef={tap}
                />
                <Card
                  containerStyle={{
                    marginHorizontal: 0,
                    borderRadius: 10,
                    position: "relative"
                  }}
                >
                  <Badge
                    value={
                      <Text
                        style={{
                          backgroundColor: `${
                            thePlace.indirim ? "#F4AD33" : "transparent"
                          }`,
                          opacity: 1,
                          color: "white",
                          borderRadius: 15,
                          padding: 4,
                          paddingHorizontal: 7,
                          transform: [{ rotate: "90deg" }]
                        }}
                      >
                        {thePlace.indirim ? `-%${thePlace.indirim}` : null}
                      </Text>
                    }
                    containerStyle={{
                      position: "absolute",
                      backgroundColor: "white",
                      right: -15
                    }}
                    badgeStyle={{ backgroundColor: "transparent" }}
                  />
                  <View
                    style={{
                      height: height * 0.38,
                      marginVertical: 5,
                      borderColor: "red",
                      borderWidth: 0
                    }}
                  >
                    <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                      <View style={{ marginHorizontal: 5 }}>
                        <Text
                          style={{
                            textAlign: "center",
                            fontSize: 22,
                            fontWeight: "bold",
                            textTransform: "capitalize"
                          }}
                        >
                          {thePlace.isim}
                        </Text>
                        <View
                          style={{
                            marginTop: 10,
                            borderColor: "green",
                            borderWidth: 0,
                            alignItems: "center",
                            flexDirection: "row",
                            zIndex: 10,
                            alignSelf: "center"
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate("Rating", {
                                data: {
                                  shopName: thePlace.isim,
                                  shopId: thePlace.id
                                }
                              });
                            }}
                          >
                            <Rating
                              onStartRating={() => {
                                navigation.navigate("Rating", {
                                  data: {
                                    shopName: thePlace.isim,
                                    shopId: thePlace.id
                                  }
                                });
                              }}
                              startingValue={thePlace.rating}
                              fractions={20}
                              imageSize={16}
                              onFinishRating={() => {
                                return null;
                              }}
                            />
                          </TouchableOpacity>
                          <Text style={{ marginLeft: 5, fontSize: 12 }}>
                            (
                            {thePlace.rating != null
                              ? parseFloat(thePlace.rating).toFixed(2)
                              : null}
                            )
                          </Text>
                        </View>
                        <View style={{ marginVertical: 10 }}></View>
                        <Text style={{ color: "black", textAlign: "auto" }}>
                          {thePlace.bilgi}
                        </Text>
                        <View style={{ marginVertical: 10 }}></View>
                        <TouchableOpacity
                          onPress={e => {
                            Linking.openURL(`tel:${thePlace.telefon}`);
                          }}
                        >
                          <View>
                            {thePlace.telefon ? (
                              <View style={{ flexDirection: "row" }}>
                                <MaterialIcons
                                  style={{ marginLeft: 0, paddingTop: 3 }}
                                  color="green"
                                  size={16}
                                  name="phone"
                                />
                                <Text style={{ color: "black", marginLeft: 5 }}>
                                  {thePlace.telefon}
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
                                  {thePlace.telefon}
                                </Text>
                              </View>
                            )}
                          </View>
                        </TouchableOpacity>
                      </View>
                    </ScrollView>
                    <View
                      style={{
                        position: "absolute",
                        bottom: -16,
                        right: -10,
                        backgroundColor: "transparent",
                        zIndex: 10,
                        borderRadius: 8,
                        padding: 4,
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
                          const latLng = `${thePlace.konum}`;
                          const label = `${thePlace.isim}`;
                          const url = Platform.select({
                            ios: `${scheme}${label}@${latLng}`,
                            android: `${scheme}${latLng}(${label})`
                          });
                          Linking.openURL(url);
                        }}
                      >
                        <Feather
                          color="#43862F" //#397DC6
                          name="navigation"
                          size={36}
                          style={{ alignSelf: "flex-end" }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </Card>
              </Card>
            </View>
      </ScrollView>
    </SafeAreaView>
  );
};

InfoScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity
          onPress={() => {
            //navigation.navigate("Settings"); send?text=hello&
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

export default InfoScreen;
