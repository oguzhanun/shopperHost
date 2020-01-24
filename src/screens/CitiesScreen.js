import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
//import AsyncStorage from '@react-native-community/async-storage'
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import NetInfo from "@react-native-community/netinfo";
import axiosInstance from "../api/axiosInstance";
import LanguageContext from "../contexts/LanguageContext";
import { NavigationEvents } from "react-navigation";
import {MaterialIcons} from "@expo/vector-icons";

const CitiesScreen = ({ navigation }) => {
  const [cities, setCities] = useState([]);
  const { state } = useContext(LanguageContext);
  // const [step, setStep] = useState()
  useEffect(() => {

    navigation.navigate("Cities", { lang: state.language });

    NetInfo.fetch().then(async state => {
      
      if (state.isConnected) {
        const result = await axiosInstance.get("/sehirler");
        //console.log("Şehirler : ", result.data);
        
        if (result.data) {
          await setCities(result.data);
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
    <View>
      {/* <NavigationEvents
        onDidFocus={ async () => {
          navigation.navigate("Cities", { lang: state.language });
          // const sth = state.language
          // await setStep(sth)
        }}
      /> */}
      <FlatList
        data={cities}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => {
          return item.sehir;
        }}
        renderItem={({ item }) => {
          return (
            <View style={{ marginBottom: 10 }}>
              <Button
                title={item.sehir}
                onPress={() => {
                  navigation.navigate("Category", { sehir: item.sehir });
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

CitiesScreen.navigationOptions = ({ navigation }) => {
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

export default CitiesScreen;
