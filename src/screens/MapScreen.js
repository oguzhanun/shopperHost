import React from "react";
import { Text, View, Dimensions } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import SafeAreaView from "react-native-safe-area-view";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Linking } from "expo";

const MapScreen = ({navigation}) => {
  const shopsPosition = navigation.getParam("shopsPosition")
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  //console.log(shopsPosition)

  return (
    <SafeAreaView forceInset={{ top: "never" }}>
      <MapView
        showsUserLocation={true}
        initialRegion={{
          latitude: 40.197996,
          longitude: 29.06112,
          latitudeDelta: 5.0922,
          longitudeDelta: 5.0421
        }}
        style={{ width, height }}
      >{
        shopsPosition.map(shop=>{
          console.log(shop.konum.split(",")[0])
          
          return(
            <Marker
          coordinate={{ latitude: parseFloat(shop.konum.split(",")[0]), longitude: parseFloat(shop.konum.split(",")[1]) }}
          title={shop.isim}
          description={"marker.description"}
        />
          )
        })
      }
        
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
          Linking.canOpenURL("whatsapp://send?phone=+905555550555").then(
            supported => {
              if (supported) {
                Linking.openURL("whatsapp://send?phone=+905555550555");
              } else
                Alert.alert(
                  "Warning",
                  "You should install WhatsApp to use this feature."
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
