import React,{useEffect, useState} from "react"
import {Text, View} from "react-native"
import SafeAreaView from "react-native-safe-area-view"
import NetInfo from "@react-native-community/netinfo"
import axios from "axios"


const OpenningScreen = ()=>{

    useEffect(()=>{
        //Check the internet connection...
        //Send a request to backend for the data...

        NetInfo.fetch().then(async state => {
            console.log('Connection type', state.type);
            console.log('Is connected?', state.isConnected);
            if(state.isConnected){
                const result = await axios({
                    method:"get",
                    url:"http://192.168.1.194:3001/shops/sehirler"
                })
                console.log(result.data)
            } else {
                return(
                    <Text>Please Check Your Internet Connection!</Text>
                )
            }
          });
    },[])
    
    return(
        <SafeAreaView forceInset={{top:"always"}}>
            <View>
                <Text>
                    Hello from OpenningScreen...
                </Text>
            </View>
        </SafeAreaView>
    )
}


export default OpenningScreen