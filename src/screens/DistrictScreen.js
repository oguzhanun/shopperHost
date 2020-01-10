import React,{useEffect, useState} from "react"
import {View, Text,Button} from "react-native"
import axiosInstance from "../api/axiosInstance"
import { FlatList } from "react-native-gesture-handler"


const DistrictScreen = (props)=>{

    const [bolgeler, setBolgeler] = useState([])
    const [sehir, setSehir] = useState("")

    useEffect( () => {

        (async function fetchBolgeler(){
        
            const sehir = props.navigation.getParam("sehir")

            setSehir(sehir)
            
            const result = await axiosInstance.get(`/bolgeler/${sehir}`)

            setBolgeler(result.data)
        })()
    },[ ])

    return(
        <View>
            <Text>
                This is District Screen...
            </Text>
            <FlatList
                data={bolgeler}
                keyExtractor={(item)=>{return item.bolge}}
                showsVerticalScrollIndicator={false}
                renderItem={({item})=>{
                    return(
                        <View style={{marginBottom:10}}>
                            <Button title={item.bolge} onPress={()=>{props.navigation.navigate("Category", {data : {sehir:sehir, bolge:item.bolge}})}}/>
                        </View>
                    )
                }}
            />
        </View>
    )
}


export default DistrictScreen