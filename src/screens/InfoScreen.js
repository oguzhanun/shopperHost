import React,{useState, useContext, useEffect} from "react"
import {View, Text,Image} from "react-native"
import {Context as AllInfoContext} from "../contexts/AllInfoContext"

const InfoScreen = (props) => {

    const [shop, setShop] = useState([])
    const [sehir, setSehir] = useState([])
    const [bolge, setBolge] = useState([])
    const [category, setCategory] = useState([])
    const [thePlace, setThePlace] = useState("null")

    const {state} = useContext(AllInfoContext)
    
    useEffect( () => {

        ( function fetchBolgeler(){
        
            const {sehir, bolge,category,shop} = props.navigation.getParam("data")
            console.log(sehir)
            console.log(bolge)
            
            setBolge(bolge)
            setSehir(sehir)
            setShop(shop)
            setCategory(category)

            //console.log(state)

            const thePlace = state.all.filter((s)=>{return s.sehir === sehir}).
                  filter((st)=>{return st.bolge===bolge}).
                  filter((sta)=>{return sta.kategori === category}).
                  filter((stat)=>{return stat.isim === shop})

            setThePlace(thePlace[0])

            console.log("thePlace : ", thePlace[0])

            //const result = await axiosInstance.get(`/kategoriler/${sehir}/${bolge}`)

            //setCategories(result.data)
        })()
    },[ ])

    return(
        <View>
            <Text>
                This is InfoScreen...
            </Text>
            <Text>{shop}</Text>
            <Text>{category}</Text>
            <Text>{bolge}</Text>
            <Text>{sehir}</Text>
            <Text>{thePlace.bilgi}</Text>

            <Image style={{width:200, height:200}} source={{uri:`http://192.168.43.9:3001${thePlace.resim1}`}}/>
        </View>
    )
}


export default InfoScreen