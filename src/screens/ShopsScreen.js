import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image,PanResponder,Dimensions } from "react-native";
import axiosInstance from "../api/axiosInstance";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import NetInfo from "@react-native-community/netinfo";
import LanguageContext from "../contexts/LanguageContext";
import { NavigationEvents } from "react-navigation";
import {MaterialIcons} from "@expo/vector-icons";
import { Linking } from "expo";
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
      return true
    },
    onPanResponderTerminationRequest: (evt, gestureState) => true,
  })

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
          console.log(result.data);
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
    <SafeAreaView style={{marginTop:10}} {...responder.panHandlers}>
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
            <View style={{ marginBottom: 5, flex:1}}>
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
                <View style={{ marginBottom: 10, 
                  backgroundColor:"white", 
                  flex:1, borderColor:"black", 
                  borderRadius:10, borderWidth:0,  flexDirection:"row",marginHorizontal:10}}>
                  <Image style={{
                        resizeMode:"cover",
                        borderWidth:0,
                        width: widthOfScreen * 0.364,
                        height: heightOfScreen * 0.16,
                        borderRadius: 10,
                        marginHorizontal: 10,
                        marginVertical:10
                      }} 
                      source={{uri:`http://192.168.1.8:3001${item.resim1}`}}/>
                  <View style={{
                    alignItems:"flex-start",
                    marginVertical:10,
                    justifyContent:"space-evenly",
                    borderColor:"black", 
                    flex:1,
                    paddingTop: 0, 
                    borderLeftWidth:0,}}>
                    <Text style={{marginLeft:10, fontSize:16, color:"#397DC6", fontWeight:"bold"}}>{item.isim.charAt(0).toUpperCase()+item.isim.substring(1)}</Text>
                    <TouchableOpacity
                      onPress={(e)=>{
                        Linking.openURL(`tel:${item.telefon}`)
                        //e.stopPropagation()
                      }}
                    >
                      <View>{
                        item.telefon ?
                            <View style={{flexDirection:"row"}}>
                              <MaterialIcons style={{marginLeft:10,paddingTop:3}} color="green" size={16} name="phone"/>
                              <Text style={{marginLeft:5, color:"black", fontWeight:"bold"}}>{item.telefon}</Text>
                            </View>
                          : <View>
                            <Text style={{marginLeft:5, color:"black", fontWeight:"bold"}}>{item.telefon}</Text>
                          </View>
                      }
                        
                      </View>
                    </TouchableOpacity>
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
          <MaterialIcons name="settings" style={{color:"grey"}} size={30}/>
        </View>
      </TouchableOpacity>
    )
  };
};

export default ShopsScreen;
