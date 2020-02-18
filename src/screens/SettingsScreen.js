import React, { useContext } from "react";
import { Text, Picker, View, Dimensions, AsyncStorage } from "react-native";
import LanguageContext from "../contexts/LanguageContext";
import SafeAreaView from "react-native-safe-area-view";


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
          }}
        >
          <Picker.Item label="Türkçe" value="TR" />
          <Picker.Item label="English" value="EN" />
          <Picker.Item label="العربية" value="AR" />
        </Picker>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
