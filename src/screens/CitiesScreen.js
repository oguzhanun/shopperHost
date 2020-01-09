import React,{useContext,useEffect} from "react"
import {View, Text, BackHandler, Button} from "react-native"
import {Context as CitiesContext} from "../contexts/CitiesContext"
import { FlatList } from "react-native-gesture-handler"


const CitiesScreen = (props) => {
    
    const {state} = useContext(CitiesContext)
    console.log("FROM CITIESSCREEN : ",state)

    return(
        <View>
            <Text>Hello from CitiesScreen</Text>
            <FlatList
                data={state.cities}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item)=>{return item.sehir}}
                renderItem={({item})=>{
                    return(
                        <View style={{marginBottom:10}}>
                            <Button title={item.sehir} onPress={()=>{props.navigation.navigate("District", {sehir : item.sehir})}}/>
                        </View>
                    )
                }}
            />
            
        </View>
    )
}

export default CitiesScreen