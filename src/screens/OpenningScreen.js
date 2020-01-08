import React,{useEffect, useState, useContext} from "react"
import {Text, View} from "react-native"
import SafeAreaView from "react-native-safe-area-view"
import NetInfo from "@react-native-community/netinfo"
import axios from "axios"
import {Context as CitiesContext} from "../contexts/CitiesContext"


const OpenningScreen = ()=>{
    
    const {state, fetchCities} = useContext(CitiesContext)

    useEffect(()=>{
        //Check the internet connection...
        //Send a request to backend for the data...

        NetInfo.fetch().then(async state => {
            console.log('Connection type', state.type);
            console.log('Is connected?', state.isConnected);
            if(state.isConnected){
                const result = await axios({
                    method:"get",
                    url:"http://192.168.43.9:3001/shops/sehirler"
                })
                console.log(result.data)

                fetchCities(result.data)
                
                const result2 = await axios({
                    method : "get",
                    url : "http://192.168.43.9:3001/shops/allPlacesInfo"
                })
                console.log("RESULT 2 INFO : ", result2.data)
            } else {
                return(
                    <Text>Please Check Your Internet Connection!</Text>
                )
            }
        });

        console.log("THE STATE OBJECT IS ", state)
    },[])

    

    //console.log("state : ", state)

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