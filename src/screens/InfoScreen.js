import React, { useState, useContext, useEffect } from "react";
import { View, Image, Dimensions, AsyncStorage } from "react-native";
import { Card, Button, Text } from "react-native-elements";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import SafeAreaView from "react-native-safe-area-view";
import NetInfo from "@react-native-community/netinfo";
import axiosInstance from "../api/axiosInstance";
import LanguageContext from "../contexts/LanguageContext";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { MaterialIcons } from "@expo/vector-icons";
import { NavigationEvents } from "react-navigation";
import { Linking } from "expo";

const InfoScreen = ({ navigation }) => {
  const [thePlace, setThePlace] = useState("null");
  const { state } = useContext(LanguageContext);
  const sliderWidth = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const [language, setLanguage] = useState(state.language);
  const itemWidth = sliderWidth - 0;
  const [index, setIndex] = useState(0);
  const [tap, setTap] = useState({});

  useEffect(() => {
    //navigation.navigate("Info", { lang: state.language });
    
    NetInfo.fetch().then(async state => {
      console.log("Async Storage :", await AsyncStorage.getItem("deviceLang"))
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
                //delete dat.kategoriEN;
                return dat;
              });
              break;
            case "AR":
              dataAdjusted = result.data.map(dat => {
                if (dat.bilgiAR) dat.bilgi = dat.bilgiAR;
                //delete dat.kategoriAR;
                return dat;
              });
              break;
            case "DE":
              dataAdjusted = result.data.map(dat => {
                if (dat.bilgiDE) dat.bilgi = dat.bilgiDE;
                //delete dat.kategoriDE;
                return dat;
              });
              break;
            case "RU":
              dataAdjusted = result.data.map(dat => {
                if (dat.bilgiRU) dat.bilgi = dat.bilgiRU;
                //delete dat.kategoriRU;
                return dat;
              });
              break;
            default:
              dataAdjusted = result.data;
          }

          console.log("DÜKKAN : ", dataAdjusted);
          setThePlace(dataAdjusted[0]);
        }
      }
    });
  }, [language]);

  return (
    <SafeAreaView forceInset={{top:"never"}} style={{ flex: 1, 
                                                  borderColor:"red", borderWidth:0, margin:0, paddingTop:0 }}>
      <View
        style={{
          flex: 1,
          // position:"absolute",
          // top:0,
          // left:0,
          justifyContent: "space-between",
          alignContent: "center",
          borderColor:"green",
          borderWidth:0,
          marginTop:10,
          paddingTop:0
        }}
      >
        <Card
          // title={
          //   thePlace.isim == null ? thePlace.isim : thePlace.isim.toUpperCase()
          // }
          containerStyle={{
            backgroundColor: "#efefef",
            flex: 1,
            marginTop:0,
            paddingTop:0,
            borderRadius: 10
          }}
        >
          <Carousel
            ref={c => setTap(c)}
            data={[
              { resim: thePlace.resim1 },
              { resim: thePlace.resim2 },
              { resim: thePlace.resim3 }
            ]}
            renderItem={({ item, index }, parallaxProps) => {
              return (
                // <ParallaxImage
                //     source={{ uri:`http://192.168.1.10:3001${item.resim}`}}

                //     parallaxFactor={0.4}
                //     {...parallaxProps}
                // />
                <View
                  style={{
                    alignItems: "center",
                    borderColor: "red",
                    borderWidth: 0,
                    marginLeft: 0,
                    marginRight: 60,
                    paddingVertical: 10,
                    borderRadius: 5
                  }}
                >
                  <Image
                    style={{
                      resizeMode:"contain",
                      width: sliderWidth * 0.85,
                      height: height * 0.32,
                      borderRadius: 5,
                      marginHorizontal: 0
                    }}
                    source={{ uri: `http://192.168.1.8:3001${item.resim}` }}
                  />
                </View>
              );
            }}
            onSnapToItem={index => setIndex(index)}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            containerCustomStyle={{ borderWidth: 0, borderColor: "red" }}
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
              position: "relative",
              // bottom: 0, backgroundColor:"#efefef"
            }}
          >
            <FlatList
              style={{
                height: height * 0.38,
                marginVertical: 10,
                borderColor: "red",
                borderWidth: 0,
                flexGrow: 1
              }}
              showsVerticalScrollIndicator={false}
              data={[thePlace.isim]}
              keyExtractor={(item, index) => {
                return index.toString();
              }}
              renderItem={({ item }) => {
                return (
                  <View style={{ marginHorizontal: 5 }}>
                    <Text
                      
                      style={{ 
                        
                        textAlign: "center",
                        fontSize: 22,
                        fontWeight: "bold"
                      }}
                    >
                      {thePlace.isim}
                    </Text>
                    <View style={{ marginVertical: 10 }}></View>

                    <Text style={{color:"black", textAlign:"justify"}}>{thePlace.bilgi}</Text>
                    <View style={{ marginVertical: 10 }}></View>
                    <TouchableOpacity
                      onPress={(e)=>{
                        Linking.openURL(`tel:${item.telefon}`)
                      }}
                    >
                      {thePlace.telefon ? 
                        <View style={{flexDirection:"row"}}>
                          <MaterialIcons style={{marginLeft:0,paddingTop:3}} color="green" size={16} name="phone"/>
                          <Text style={{color:"black",}} > {thePlace.telefon}</Text>
                        </View>
                        :
                        null  
                    }
                      
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </Card>
          <View style={{ marginTop: 20, zIndex:1, marginHorizontal: 0 }}>
            <Button
              buttonStyle={{backgroundColor: 'purple', borderRadius:10}}
              title={`GO TO  ${
                thePlace.isim == null
                  ? thePlace.isim
                  : thePlace.isim.toUpperCase()
              }`}
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
            />
          {/* <View style={{ marginBottom: 20 }}></View> */}
        </View>
        </Card>
        
      </View>
      <NavigationEvents
        onDidFocus={() => {
          setLanguage(state.language);
          //navigation.navigate("Category", { lang: state.language });
        }}
      />
    </SafeAreaView>
  );
};

InfoScreen.navigationOptions = ({ navigation }) => {
  return {
    // headerRight:  () => <View style={{marginRight:10}}><Text>{navigation.getParam("lang")}</Text></View>
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

export default InfoScreen;

{
  /* <FlatList
            data={[thePlace.resim1, thePlace.resim2, thePlace.resim3]}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            horizontal={true}
            // style={{borderColor:"red", borderWidth:1}}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              console.log("item ", item);
              console.log("index ", index);
              return (
                <View>
                  <Image
                    style={{
                      borderWidth: 2,
                      borderColor: "grey",
                      width: Math.round((dimensions.width * 12) / 16),

                      height: Math.round((dimensions.width * 9) / 16),
                      marginHorizontal: 5
                    }}
                    resizeMode="contain"
                    source={{ uri: `http://192.168.1.10:3001${item}` }}
                  />
                </View>
              );
            }}
          /> */
}

{
  /* <SlideShow
            arrowSize={16}
            indicatorSelectedColor="#ffff00"
            height={250}
            indicatorSize={14}
            position={position}
            scrollEnabled={false}
            onPositionChanged={position => setPosition( position )}
            dataSource={[{
              url:`http://192.168.1.10:3001${thePlace.resim1}`
            },{
              url:`http://192.168.1.10:3001${thePlace.resim2}`
            },{
              url:`http://192.168.1.10:3001${thePlace.resim3}`
            }]}
          /> */
}
