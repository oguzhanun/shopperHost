import React, { useState, useEffect, useContext } from "react";
import { View, Text, Button } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import axiosInstance from "../api/axiosInstance";
import NetInfo from "@react-native-community/netinfo";
import LanguageContext from "../contexts/LanguageContext";

const CategoryScreen = ({navigation}) => {
  const [categories, setCategories] = useState([]);
  const [sehir, setSehir] = useState([]);
  const {state} = useContext(LanguageContext)

  useEffect(() => {

    navigation.navigate("Category", { lang : state.language });

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

CategoryScreen.navigationOptions = ({navigation})=>{
  return {
    headerRight:  () => <View style={{marginRight:10}}><Text>{navigation.getParam("lang")}</Text></View>
  }
}

export default CategoryScreen;
