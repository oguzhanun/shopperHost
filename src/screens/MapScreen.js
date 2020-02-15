import React from "react";
import { Text, View, Dimensions } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import SafeAreaView from "react-native-safe-area-view";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Linking } from "expo";

const MapScreen = ({ navigation }) => {
  const shopsPosition = navigation.getParam("shopsPosition");
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  //console.log(shopsPosition)

  return (
    <SafeAreaView forceInset={{ top: "never" }}>
      <MapView
        showsUserLocation={true}
        initialRegion={{
          latitude: 39.797682, 
          longitude: 33.509642,
          latitudeDelta: 10.0922,
          longitudeDelta: 15.0421
        }}
        style={{ width, height }}
      >
        {shopsPosition.map(shop => {
          console.log(shop.konum.split(",")[0]);

          return (
            <Marker
              key={shop.isim}
              coordinate={{
                latitude: parseFloat(shop.konum.split(",")[0]),
                longitude: parseFloat(shop.konum.split(",")[1])
              }}
              title={shop.isim}
              description={"marker.description"}
            />
          );
        })}
      </MapView>
    </SafeAreaView>
  );
};

MapScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        onPress={() => {
          //navigation.navigate("Settings"); send?text=hello&
          Linking.canOpenURL("whatsapp://send?phone=+905383505515").then(
            supported => {
              if (supported) {
                Linking.openURL("whatsapp://send?phone=+905383505515");
              } else
                Alert.alert(
                  "Uyarı",
                  "Bu özelliği kullanabilmeniz için WhatsApp uygulamasını telefonunuza yüklemeniz gerekmektedir."
                );
            }
          );
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
          {/* <MaterialIcons name="settings" style={{ color: "grey" }} size={30} /> */}
          <MaterialCommunityIcons name="whatsapp" color="green" size={38} />
        </View>
      </TouchableOpacity>
    )
  };
};

export default MapScreen;
