import React, { useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Button
} from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import NetInfo from "@react-native-community/netinfo";
import LanguageContext from "../contexts/LanguageContext";

const OpenningScreen = ({ navigation }) => {
  const { state, changeLanguage } = useContext(LanguageContext);

  console.log(state.language);
  useEffect(() => {
    NetInfo.fetch().then(async state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);

      if (state.isConnected) {
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

  const languageIssues = language => {
    changeLanguage(language);
    navigation.navigate("Openning", { lang : language });
    navigation.navigate("Cities")
  };

  return (
    <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
      <View style={{ flex: 1, justifyContent: "flex-start" }}>
        <Text style={{ marginLeft: 40 }}> Select Your Language Please... </Text>
        <View
          style={{
            flex: 0.2,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "flex-start",
            margin: 10
          }}
        >
          <View style={{ margin: 10 }}>
            <Button title="English" onPress={() => languageIssues("English")} />
          </View>
          <View style={{ margin: 10 }}>
            <Button title="Arabic" onPress={() => languageIssues("Arabic")} />
          </View>
          <View style={{ margin: 10 }}>
            <Button title="Turkish" onPress={() => languageIssues("Turkish")} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

OpenningScreen.navigationOptions = ({ navigation }) => {
  
  return {
    headerRight:  () => <View style={{marginRight:10}}><Text>{navigation.getParam("lang")}</Text></View>
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    borderColor: "red",
    borderWidth: 0,
    marginBottom: 200
  }
});

export default OpenningScreen;
