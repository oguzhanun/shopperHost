import React,{useEffect, useState} from "react"
import {View, Text,Button} from "react-native"
import axios from "axios"
import { FlatList } from "react-native-gesture-handler"


const DistrictScreen = (props)=>{

    const [bolgeler, setBolgeler] = useState([])

    useEffect( () => {

        (async function fetchBolgeler(){
        
            const sehir = props.navigation.getParam("sehir")
            
            const result = await axios({
                method:"get",
                url:`http://192.168.1.7:3001/shops/bolgeler/${sehir}`
            })

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
                            <Button title={item.bolge}/>
                        </View>
                    )
                }}
            />
        </View>
    )
}


export default DistrictScreen