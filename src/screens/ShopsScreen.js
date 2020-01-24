import React, { useState, useEffect, useContext } from "react";
import { View, Text, Button } from "react-native";
import axiosInstance from "../api/axiosInstance";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import NetInfo from "@react-native-community/netinfo";
import LanguageContext from "../contexts/LanguageContext";
import { NavigationEvents } from "react-navigation";
import {MaterialIcons} from "@expo/vector-icons";

const ShopsScreen = ({ navigation }) => {
  const [shops, setShops] = useState([]);
  const [sehir, setSehir] = useState([]);
  const [category, setCategory] = useState([]);
  const { state } = useContext(LanguageContext);

  useEffect(() => {
    navigation.navigate("Shops", { lang: state.language });

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
