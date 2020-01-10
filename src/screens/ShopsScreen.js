import React, {useState, useEffect} from "react"
import {View, Text, Button} from "react-native"
import axiosInstance from "../api/axiosInstance"
import { FlatList } from "react-native-gesture-handler"


const ShopsScreen = ({navigation}) => {

    const [shops, setShops] = useState([])
    const [sehir, setSehir] = useState([])
    const [bolge, setBolge] = useState([])
    const [category, setCategory] = useState([])

    useEffect( () => {

        (async function fetchBolgeler(){
        
            const {sehir, bolge, kategori} = navigation.getParam("data")
            console.log(sehir)
            console.log(bolge)
            console.log(kategori)

            setSehir(sehir)
            setBolge(bolge)
            setCategory(kategori)
            
            const result = await axiosInstance.get(`/dukkanlar/${sehir}/${bolge}/${kategori}`)

            setShops(result.data)
        })()
    },[ ])

    return(
        <View>
            <Text>This is ShopsScreen...</Text>
            <FlatList
                data={shops}
                keyExtractor={(item)=>{return item.isim}}
                showsVerticalScrollIndicator={false}
                renderItem={({item})=>{
                    return(
                        <View style={{marginBottom:10}}>
                            <Button title={item.isim} 
                                    onPress={()=>{navigation.navigate("Info", {
                                        data:{
                                            sehir:sehir,
                                            bolge:bolge,
                                            category : category,
                                            shop : item.isim
                                        }
                                    })}}/>
                        </View>
                    )
                }}
            />
        </View>
    )
}


export default ShopsScreen