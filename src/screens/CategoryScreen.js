import React,{useState, useEffect} from "react"
import {View, Text, Button} from "react-native"
import { FlatList } from "react-native-gesture-handler"
import axiosInstance from "../api/axiosInstance"


const CategoryScreen = (props) => {

    const [categories, setCategories] = useState([])
    const [sehir, setSehir] = useState([])
    const [bolge, setBolge] = useState([])
    
    useEffect( () => {

        (async function fetchBolgeler(){
        
            const {sehir, bolge} = props.navigation.getParam("data")
            console.log(sehir)
            console.log(bolge)
            
            setBolge(bolge)
            setSehir(sehir)

            const result = await axiosInstance.get(`/kategoriler/${sehir}/${bolge}`)

            setCategories(result.data)
        })()
    },[ ])

    return(
        <View>
            <Text>
                This is the CategoryScreen...
            </Text>
            <FlatList
                data={categories}
                keyExtractor={(item)=>{return item.kategori}}
                showsVerticalScrollIndicator={false}
                renderItem={({item})=>{
                    return(
                        <View style={{marginBottom:10}}>
                            <Button title={item.kategori} 
                                    onPress={()=>{
                                        props.navigation.navigate("Shops", 
                                                            {data:{
                                                                sehir:sehir,
                                                                bolge:bolge,
                                                                kategori:item.kategori
                                                            }})
                                    }}/>
                        </View>
                    )
                }}
            />
        </View>
    )
}


export default CategoryScreen