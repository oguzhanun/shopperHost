import React from "react";
import { Text, View } from "react-native";
import { Formik } from "formik";
import { Slider, Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import {  MaterialCommunityIcons} from "@expo/vector-icons";
import { Linking } from "expo";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";

const RatingScreen = ({ navigation }) => {

  const {shopName,shopId} = navigation.getParam("data");
  
  return (
    <SafeAreaView forceInset={{ top: "never" }}>
      <View>
        <View
          style={{
            borderColor: "purple",
            borderWidth: 0,
            justifyContent: "center",
            marginBottom: 30,
            alignItems: "center"
          }}
        >
          <Text
            style={{
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 22
            }}
          >
            {shopName}
          </Text>
        </View>
        <Formik
          initialValues={{
            slider1: 5,
            slider2: 5,
            slider3: 5,
            slider4: 5,
            slider5: 5
          }}
          onSubmit={ async values => {
            let toplam = 0;
            let ortalama = 0;

            for (let i in values) {
              toplam = toplam + values[i];
            }
            ortalama = toplam / 5;
            const response = await axios("http://37.247.107.18:1818/ratings/give/rate",{
              method:"post",
              data:{
                ortalama,
                rateGiver:"anonim",
                rateTaker:shopName,
                rateTakerId:shopId,
                rateGiverId:55
              }
            })
            if(response.data == "ok"){
              navigation.goBack()
            }
          }}
        >
          {props => (
            <View>
              <View style={{ marginBottom: 5 }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ marginLeft: 10, fontWeight: "bold" }}>
                    HİZMET KALİTESİ:
                  </Text>
                  <Text style={{ fontWeight: "bold", marginLeft: 10 }}>
                    {props.values.slider1}
                  </Text>
                </View>
                <Slider
                  style={{
                    backgroundColor: "grey",
                    borderWidth:0, borderColor:"red",
                    height: 40,
                    borderRadius: 10,
                    marginVertical: 10,
                    marginHorizontal: 5
                  }}
                  thumbTouchSize={{width:200, height:100}}
                  trackStyle={{ height: 6 }}
                  minimumTrackTintColor="gold"
                  maximumTrackTintColor="grey"
                  thumbTintColor="gold"
                  step={1}
                  minimumValue={0}
                  maximumValue={5}
                  value={props.values.slider1}
                  onValueChange={value => props.setFieldValue("slider1", value)}
                />
              </View>
              <View style={{ marginBottom: 5 }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ marginLeft: 10, fontWeight: "bold" }}>
                    GÜLERYÜZ VE HOŞGÖRÜ:
                  </Text>
                  <Text style={{ fontWeight: "bold", marginLeft: 10 }}>
                    {props.values.slider2}
                  </Text>
                </View>
                <Slider
                  minimumTrackTintColor="gold"
                  maximumTrackTintColor="grey"
                  thumbTintColor="gold"
                  trackStyle={{ height: 6 }}
                  style={{
                    backgroundColor: "grey",
                    height: 40,
                    borderRadius: 10,
                    marginVertical: 10,
                    marginHorizontal: 5
                  }}
                  thumbTouchSize={{width:200, height:100}}
                  step={1}
                  minimumValue={0}
                  maximumValue={5}
                  value={props.values.slider2}
                  onValueChange={value => props.setFieldValue("slider2", value)}
                />
              </View>
              <View style={{ marginBottom: 5 }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ marginLeft: 10, fontWeight: "bold" }}>
                    TEMİZLİK:
                  </Text>
                  <Text style={{ fontWeight: "bold", marginLeft: 10 }}>
                    {props.values.slider3}
                  </Text>
                </View>
                <Slider
                  thumbTouchSize={{width:200, height:100}}
                  minimumTrackTintColor="gold"
                  maximumTrackTintColor="grey"
                  thumbTintColor="gold"
                  trackStyle={{ height: 6 }}
                  style={{
                    backgroundColor: "grey",
                    height: 40,
                    borderRadius: 10,
                    marginVertical: 10,
                    marginHorizontal: 5
                  }}
                  step={1}
                  minimumValue={0}
                  maximumValue={5}
                  value={props.values.slider3}
                  onValueChange={value => props.setFieldValue("slider3", value)}
                />
              </View>
              <View style={{ marginBottom: 5 }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ marginLeft: 10, fontWeight: "bold" }}>
                    LEZZET:
                  </Text>
                  <Text style={{ fontWeight: "bold", marginLeft: 10 }}>
                    {props.values.slider4}
                  </Text>
                </View>
                <Slider
                  thumbTouchSize={{width:200, height:100}}
                  minimumTrackTintColor="gold"
                  maximumTrackTintColor="grey"
                  thumbTintColor="gold"
                  trackStyle={{ height: 6 }}
                  style={{
                    backgroundColor: "grey",
                    height: 40,
                    borderRadius: 10,
                    marginVertical: 10,
                    marginHorizontal: 5
                  }}
                  step={1}
                  minimumValue={0}
                  maximumValue={5}
                  value={props.values.slider4}
                  onValueChange={value => props.setFieldValue("slider4", value)}
                />
              </View>
              <View style={{ marginBottom: 5 }}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ marginLeft: 10, fontWeight: "bold" }}>
                    OTOPARK:
                  </Text>
                  <Text style={{ fontWeight: "bold", marginLeft: 10 }}>
                    {props.values.slider5}
                  </Text>
                </View>
                <Slider
                  thumbTouchSize={{width:200, height:100}}
                  minimumTrackTintColor="gold"
                  maximumTrackTintColor="grey"
                  thumbTintColor="gold"
                  trackStyle={{ height: 6 }}
                  style={{
                    backgroundColor: "grey",
                    height: 40,
                    borderRadius: 10,
                    marginVertical: 10,
                    marginHorizontal: 5
                  }}
                  step={1}
                  minimumValue={0}
                  maximumValue={5}
                  value={props.values.slider5}
                  onValueChange={value => props.setFieldValue("slider5", value)}
                />
              </View>
              <View
                style={{
                  marginTop: 30,
                  marginHorizontal: 10,
                  borderRadius: 10,
                  color: "black",
                  borderColor: "red",
                  borderWidth: 0,
                  alignItems: "flex-end"
                }}
              >
                <Button
                  title="GÖNDER"
                  buttonStyle={{ width: 180, backgroundColor: "grey" }}
                  onPress={() => props.handleSubmit()}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

RatingScreen.navigationOptions = ( ) => {
  return {
    headerRight: () => (
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity
          onPress={() => {
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
            <MaterialCommunityIcons name="whatsapp" color="#43862F" size={38} />
          </View>
        </TouchableOpacity>
      </View>
    )
  };
};

export default RatingScreen;
