import React from "react"
import { FlatList } from "react-native-gesture-handler"


const BodyComponent = () => {

    return(
        <FlatList
            data={props.dataArray}
            keyExtractor={(item)=>{return item[phaseName]}}
            showsVerticalScrollIndicator={false}
            renderItem={({item})=>{
                return(
                    <View style={{marginBottom:10}}>
                        <Button title={item[phaseName]} onPress={()=>{props.navigation.navigate("Category", {data : {sehir:sehir, bolge:item.bolge}})}}/>
                    </View>
                )
            }}
        />
    )
}


export default BodyComponent