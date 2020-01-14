import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import axiosInstance from "../api/axiosInstance";
import { FlatList } from "react-native-gesture-handler";
import NetInfo from "@react-native-community/netinfo";

const ShopsScreen = ({ navigation }) => {
  const [shops, setShops] = useState([]);
  const [sehir, setSehir] = useState([]);
  const [category, setCategory] = useState([]);

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

        if (result.data) {
          await setShops(result.data);
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
      <Text>This is ShopsScreen...</Text>
      <FlatList
        data={shops}
        keyExtractor={item => {
          return item.isim;
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View style={{ marginBottom: 10 }}>
              <Button
                title={item.isim}
                onPress={() => {
                  navigation.navigate("Info", {
                    data: {
                      shopId: item.id
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

export default ShopsScreen;
