import { OleoScript_400Regular, OleoScript_700Bold } from "@expo-google-fonts/oleo-script";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useFonts } from "expo-font";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from "react-native";
import { faPlus, faFilter } from "@fortawesome/free-solid-svg-icons";
import { gray200, gray400, primary } from "@styles/variables";
import { receiptEx } from "utils/constants/example-data/ex-reciept";
import { useMemo, useState } from "react";
import ReceiptCard from "./components/receipt-card";
export default function ReceiptsScreenList(){
    const [filterStr, setFilterStr] = useState("")
    const [fontsLoaded] = useFonts({
        OleoScriptRegular: OleoScript_400Regular,
        OleoScriptBold: OleoScript_700Bold,
    });

    // receipt needs to be from the store currently it is just example data
    const receiptListFiltered = useMemo(()=>{ 
        return receiptEx.filter((r)=>{
            return filterStr == "" || r.name.includes(filterStr) || r.date.toDateString().includes(filterStr);
        });
    },[filterStr]);

    return (
    <View style={styles.screenContainer}>
        <Text style={styles.titleCard}>All Receipts</Text>
        <View style={styles.utilBar}>
            <TouchableOpacity>
                <FontAwesomeIcon icon={faPlus} size={30} style={styles.utilButton}/>
            </TouchableOpacity>
            <TextInput style={styles.searchBox} placeholder={"Filter Name or Date"}/>
            <TouchableOpacity>
                <FontAwesomeIcon icon={faFilter} size={30} style={styles.utilButton}/>
            </TouchableOpacity>
        </View>
        <FlatList 
            style={styles.receiptsList}
            data={receiptListFiltered}
            renderItem={({item})=>( <ReceiptCard receipt={item}/> )}
        />
    </View>
    );
}

const styles =StyleSheet.create({
    screenContainer:{
        flex:1,
        display:"flex",
        flexDirection:"column",
        backgroundColor: gray200
    },
    titleCard:{
        fontFamily:"OleoScriptBold",
        fontSize:34,
        marginLeft:"auto",
        marginRight:"auto",
        paddingTop:20,
        paddingBottom:20
    },
    utilBar:{
        marginLeft:"auto",
        marginRight:"auto",
        display:"flex",
        flexDirection:"row",
        gap:10,
    },
    searchBox:{
        width:"60%",
        backgroundColor:"white",
        borderRadius:30,
        paddingLeft:10,
        boxShadow: `0px 4px 4px 0px ${gray400}`
    },
    utilButton:{
        color:primary
    },
    receiptsList:{
        flex:1,
        display:"flex",
        flexDirection:"column",
        overflow:"scroll",
        gap: 10
    }
});