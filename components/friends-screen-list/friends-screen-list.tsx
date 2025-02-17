import { faPlus, faFilter, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { gray200, gray400, primary } from "@styles/variables";
import ReceiptCard from "components/receipts-screen-list/components/receipt-card";
import { useMemo, useState } from "react";
import { FlatList, TextInput, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useStore } from "store";
import { friendsEx } from "utils/constants/example-data/ex-friends";
import FriendCard from "./components/friend-card";

export default function FriendsScreenList(){
    const [filterStr, setFilterStr] = useState("");
    const store = useStore().store;
    const friendsFiltered = useMemo(()=>{
        return friendsEx.filter((f)=>{return filterStr == "" || f.firstName.includes(filterStr) || f.lastName.includes(filterStr)}).sort((f1,f2)=>{return f1.firstName.localeCompare(f2.firstName)});
    }, []);

    return (
    <View style={styles.screenContainer}>
        <Text style={styles.titleCard}>All Friends</Text>
        <View style={styles.utilBar}>
            <TouchableOpacity>
                <FontAwesomeIcon icon={faPlus} size={30} style={styles.utilButton}/>
            </TouchableOpacity>
            <TextInput style={styles.searchBox} placeholder={"Filter Name or Date"}/>
            <TouchableOpacity>
                <FontAwesomeIcon icon={faUpload} size={30} style={styles.utilButton}/>
            </TouchableOpacity>
        </View>
        <FlatList 
            style={styles.friendsList}
            data={friendsFiltered}
            renderItem={({item})=>( <FriendCard friend={item}/> )}
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
        marginBottom:10,
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
    friendsList:{
        flex:1,
        display:"flex",
        flexDirection:"column",
        overflow:"scroll",
        gap: 10
    }
});