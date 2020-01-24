import React, { useContext } from "react";
import { Text, Picker, View, Dimensions } from "react-native";
import LanguageContext from "../contexts/LanguageContext";
import SafeAreaView from "react-native-safe-area-view";
import * as SQLite from "expo-sqlite";

const SettingsScreen = () => {
  const { state, changeLanguage } = useContext(LanguageContext);
  const width = Dimensions.get("window").width;

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
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
            borderWidth: 3
          }}
          onValueChange={async (itemValue, itemIndex) => {
            changeLanguage(itemValue);
            const db = await SQLite.openDatabase("shopperHostDB");

            await db.transaction(tx => {
              tx.executeSql(`update setting set language = ? where id = 1;`, [
                `${itemValue.toLowerCase()}_${itemValue}`,
              ]);
              console.log(itemValue)
            });
            
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
