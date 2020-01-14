import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import axiosInstance from "../api/axiosInstance";
import NetInfo from "@react-native-community/netinfo";

const CategoryScreen = ({navigation}) => {
  const [categories, setCategories] = useState([]);
  const [sehir, setSehir] = useState([]);

  useEffect(() => {
    NetInfo.fetch().then(async state => {
			if (state.isConnected) {
				const sehir = navigation.getParam("sehir");
				
				if(sehir){
					await setSehir(sehir);
				}

				const result = await axiosInstance.get(`/kategoriler/${sehir}`);
				
				if(result.data){
					setCategories(result.data)
				}
			} else {
        return (
          <View>
            <Text>Please Check Your Internet Connection!</Text>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        );
      }
		})
	}, []);

  return (
    <View>
      <Text>This is the CategoryScreen...</Text>
      <FlatList
        data={categories}
        keyExtractor={item => {
          return item.kategori;
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View style={{ marginBottom: 10 }}>
              <Button
                title={item.kategori}
                onPress={() => {
                  navigation.navigate("Shops", {
                    data: {
                      sehir: sehir,
                      kategori: item.kategori
                    }
                  });
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default CategoryScreen;
