import React, { useContext, useEffect,useState } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import NetInfo from "@react-native-community/netinfo";
import axiosInstance from "../api/axiosInstance";
import LanguageContext from "../contexts/LanguageContext";

const CitiesScreen = ({navigation}) => {
  const {state} = useContext(LanguageContext)
  console.log(state)
	const [cities, setCities] = useState([])
	
  useEffect(() => {
    NetInfo.fetch().then(async state => {
      if (state.isConnected) {
        const result = await axiosInstance.get("/sehirler");
				console.log("Şehirler : ", result.data);
				if(result.data){
					await setCities(result.data)
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
      <Text>Hello from CitiesScreen</Text>
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

export default CitiesScreen;
