import React, { useEffect, useState, useContext } from "react";
import {Text,View,StyleSheet,ActivityIndicator,BackHandler} from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import NetInfo from "@react-native-community/netinfo";
import axiosInstance from "../api/axiosInstance";
import { Context as AllInfoContext } from "../contexts/AllInfoContext";
import { Context as CitiesContext } from "../contexts/CitiesContext";
import { NavigationEvents } from "react-navigation";

const OpenningScreen = props => {
  const [message, setMessage] = useState("WELCOME TO SHOPPERHOST :-|)");
  const { fetchCities } = useContext(CitiesContext);
  const { state, fetchAll } = useContext(AllInfoContext);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    //Check the internet connection...
    //Send a request to backend for the data...

    if (counter <= 1) {
      NetInfo.fetch().then(async state => {
        console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);

        if (state.isConnected) {
          //veritabanından distinct şehirleri çekiyoruz.
          const result = await axiosInstance.get("/sehirler");

          fetchCities(result.data);

          //burada tablo içinde ne var ne yok hepsini çekip result2 ye atıyoruz.
          //?????? bunu yapmalı mıyız ona sonra karar vereceğiz ???????
          const result2 = await axiosInstance.get("/allPlacesInfo");

          const result3 = await axiosInstance.get("/staticInfo")
          const sth = result3.data.map(f=>{return f.sehir})
          console.log("sth : ", sth)
          const uniqueCities = new Set(sth)

          console.log("UNIQUE CITIES : " , uniqueCities)

          console.log("RESULT 3 : ",result3.data)


          //bu metod ile tüm verileri alıp context içine koyuyoruz. ama şimdilik bunu
          //kullanmak yerine her ekrana özel veriyi çekip kullanma yöntemini kullanacağız.
          //eğer uygulamada tıkanmaya neden olmazsa bunu da kullanabiliriz.
          fetchAll(result2.data);
        } else {
          return (
            <View>
              <Text>Please Check Your Internet Connection!</Text>
              <ActivityIndicator size="large" color="#00ff00" />
            </View>
          );
        }
      });

      setTimeout(() => {
        props.navigation.navigate("Cities");
      }, 1800);
    }
    if (counter > 1) {
      console.log("--GOBACK METHOD");
      console.log(counter);

      setCounter(1);
      setMessage("");

      BackHandler.exitApp();
    }
  }, [counter]);

  //console.log("THE STATE TWO IS IN PLACE : ",state)
  //console.log("state : ", state)

  const timeoutMessage = () => {
    setTimeout(() => {
      setMessage("GOODBYE WE WILL MISS YOU :(");
    }, 2500);
    return message;
  };
  return (
    <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
      <View>
        <NavigationEvents
          onWillFocus={() => {
            console.log("--ONDIDFOCUS...");
            setCounter(counter + 1);
            console.log(counter);
          }}
        />
        <Text> {timeoutMessage()}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "red",
    borderWidth: 0,
    marginBottom: 150
  }
});

export default OpenningScreen;
