import React from "react";
import { View, Dimensions,Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Linking } from "expo";

const MapScreen = ({ navigation }) => {
  const shopsPosition = navigation.getParam("shopsPosition");
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  return (
    <View style={{flex:1}}>
      <MapView
        initialRegion={{
          latitude: 39.797682, 
          longitude: 33.509642,
          latitudeDelta: 10.0922,
          longitudeDelta: 15.0421
        }}
        style={{ height,width }} 
      >
        {shopsPosition.map(shop => {
          return (
            <Marker
              key={shop.isim + shop.konum}
              coordinate={{
                latitude: parseFloat(shop.konum.split(",")[0]),
                longitude: parseFloat(shop.konum.split(",")[1])
              }}
              title={shop.isim}
            />
          );
        })}
      </MapView>
    </View>
  );
};

MapScreen.navigationOptions = ( ) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        onPress={() => {
          Linking.canOpenURL("https://wa.me/905383505515").then(
            supported => {
              if (supported) {
                Linking.openURL("https://wa.me/905383505515")
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
          <MaterialCommunityIcons name="whatsapp" color="green" size={38} />
        </View>
      </TouchableOpacity>
    ),
    headerTitle: (
      <Text style={{ color: "#43862F", fontWeight: "bold", fontSize: 22 }}>
        
      </Text>
    )
  };
};

export default MapScreen;
