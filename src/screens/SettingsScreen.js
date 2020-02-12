import React, { useContext } from "react";
import { Text, Picker, View, Dimensions, AsyncStorage } from "react-native";
import LanguageContext from "../contexts/LanguageContext";
import SafeAreaView from "react-native-safe-area-view";
import * as SQLite from "expo-sqlite";


const SettingsScreen = () => {
  const { state, changeLanguage } = useContext(LanguageContext);
  const width = Dimensions.get("window").width;

  return (
    <SafeAreaView forceInset={{ top:"always" }} style={{alignItems:"center"}}>
      <View style={{ marginTop: 25 }}>
        <Text>SELECT YOUR LANGUAGE</Text>
        <Picker
          selectedValue={state.language}
          mode="dialog"
          style={{
            height: 50,
            width: width * 0.33,
            marginHorizontal: 20,
            borderColor: "black",
            borderWidth: 0
          }}
          onValueChange={async (itemValue, itemIndex) => {
            changeLanguage(itemValue);
            await AsyncStorage.setItem("deviceLang",itemValue)

            const db = await SQLite.openDatabase("applaklak");

            await db.transaction(
              tx => {
                tx.executeSql(
                  "create table if not exists ayar (id integer primary key not null, language TEXT unique);"
                );
              },
              (err, succ) => {
                if (err) {
                  console.log(err);
                }
              }
            );

            await db.transaction(tx => {
              tx.executeSql(`update ayar set language=? where id=1;`, [itemValue]);
              console.log("ITEM VALUE:",itemValue)
            });

            await db.transaction(tx => tx.executeSql(`select * from ayar;`, [], async (tx, set) => {
                console.log("set-->:",set)
              })
            ) 
          }}
        >
          <Picker.Item label="Türkçe" value="TR" />
          <Picker.Item label="English" value="EN" />
          <Picker.Item label="Deutsch" value="DE" />
          <Picker.Item label="русский" value="RU" />
          <Picker.Item label="العربية" value="AR" />
        </Picker>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
