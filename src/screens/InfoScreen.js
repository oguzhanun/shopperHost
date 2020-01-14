import React, { useState, useContext, useEffect } from "react";
import { View, Text, Image, Dimensions } from "react-native";
import { Card, Button } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import SafeAreaView from "react-native-safe-area-view";
import NetInfo from "@react-native-community/netinfo";
import axiosInstance from "../api/axiosInstance";

const InfoScreen = ({navigation}) => {

  const [thePlace, setThePlace] = useState("null");

  const dimensions = Dimensions.get("window");

  useEffect(() => {
    NetInfo.fetch().then(async state => {
			if (state.isConnected) {
				const { shopId } = navigation.getParam("data");	
				
				const result = await axiosInstance.get(`/dukkan/${shopId}`)
				if(result.data){
					console.log("DÜKKAN : ",result.data)
					setThePlace(result.data[0])
				}
			}
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <Card title={thePlace.isim == null ? thePlace.isim : thePlace.isim.toUpperCase()} containerStyle={{ flex: 1 }}>
          <FlatList
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
          />
          <FlatList
            style={{ height: 300, marginVertical: 20, flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            data={[thePlace.resim1]}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            renderItem={({ item }) => {
              return (
                <View style={{ marginHorizontal: 5 }}>
                  <View style={{ marginVertical: 10 }}></View>
                  <Text>{thePlace.bilgi}</Text>
                  <View style={{ marginVertical: 10 }}></View>
                  <Text>{thePlace.telefon}</Text>
                  <Text style={{textAlign:"justify"}}>
                    aşskjdşf jaksdş fjkasş dfjkasdkfjaşs dkfjas jdkfsdjf kjaskdl
                    fjşadsklfj aşskjdş fjaksd şf jka sşdf jkasdkfjaşsdkf jasjdk
                    fsdj fkjask dlfjş adsklfj aşskjdşf jaksdş fjkasş
                    dfjkasdkfjaşs dkfjas jdkfsdjf kjaskdl fjşadsklfj aşskjdş
                    fjaksd şf jka sşdf jkasdkfjaşsdkf jasjdk fsdj fkjask dlfjş
                    adsklfj aşskjdşf jaksdş fjkasş dfjkasdkfjaşs dkfjas jdkfsdjf
                    kjaskdl fjşadsklfj aşskjdş fjaksd şf jka sşdf jkasdkfjaşsdkf
                    jasjdk fsdj fkjask dlfjş adsklfj aşskjdşf jaksdş fjkasş
                    dfjkasdkfjaşs dkfjas jdkfsdjf kjaskdl fjşadsklfj aşskjdş
                    fjaksd şf jka sşdf jkasdkfjaşsdkf jasjdk fsdj fkjask dlfjş
                    adsklfj aşskjdşf jaksdş fjkasş dfjkasdkfjaşs dkfjas jdkfsdjf
                    kjaskdl fjşadsklfj aşskjdş fjaksd şf jka sşdf jkasdkfjaşsdkf
                    jasjdk fsdj fkjask dlfjş adsklfj aşskjdşf jaksdş fjkasş
                    dfjkasdkfjaşs dkfjas jdkfsdjf kjaskdl fjşadsklfj aşskjdş
                    fjaksd şf jka sşdf jkasdkfjaşsdkf jasjdk fsdj fkjask dlfjş
                    adsklfj aşskjdşf jaksdş fjkasş dfjkasdkfjaşs dkfjas jdkfsdjf
                    kjaskdl fjşadsklfj aşskjdş fjaksd şf jka sşdf jkasdkfjaşsdkf
                    jasjdk fsdj fkjask dlfjş adsklfj aşskjdşf jaksdş fjkasş
                    dfjkasdkfjaşs dkfjas jdkfsdjf kjaskdl fjşadsklfj aşskjdş
                    fjaksd şf jka sşdf jkasdkfjaşsdkf jasjdk fsdj fkjask dlfjş
                    adsklfj aşskjdşf jaksdş fjkasş dfjkasdkfjaşs dkfjas jdkfsdjf
                    kjaskdl fjşadsklfj aşskjdş fjaksd şf jka sşdf jkasdkfjaşsdkf
                    jasjdk fsdj fkjask dlfjş adsklfj aşskjdşf jaksdş fjkasş
                    dfjkasdkfjaşs dkf
                  </Text>
                </View>
              );
            }}
          />
        </Card>
        <View style={{ marginTop: 10, marginHorizontal: 15 }}>
          <Button title={`GOTO  ${thePlace.isim == null ? thePlace.isim : thePlace.isim.toUpperCase()}`}></Button>
          <View style={{ marginBottom: 20 }}></View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default InfoScreen;
