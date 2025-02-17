import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { gray200, primary, secondary } from "@styles/variables";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useStore } from "store";
import { RootStackParamList } from "utils/types/store-types";

type FriendEditRouteProp = RouteProp<RootStackParamList, "FriendEdit">;

export default function FriendEdit(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const route = useRoute<FriendEditRouteProp>();
    const nav = useNavigation();
    const store = useStore().store;
    const { friend } = route.params; // Get the friend object
    useEffect(()=>{
        if (friend.firstName) setFirstName(friend.firstName);
        if (friend.lastName) setLastName(friend.lastName);
    },[])
    
    function handleUpdate(){
        store.updateFriend({id:friend.id, firstName:firstName, lastName:lastName}, nav);
    }
    return (
        <View style={styles.screenContainer}>
            <Text style={styles.titleCard}>{firstName} {lastName}</Text>
            <View style={styles.row}>
                <TextInput style={styles.textBoxes} placeholder={"First Name"} value={firstName} onChangeText={setFirstName}/>
            </View>
            <View style={styles.row}>
                <TextInput style={styles.textBoxes} placeholder={"Last Name"} value={lastName} onChangeText={setLastName}/>
            </View>
            <LinearGradient
                colors={[primary, secondary]}
                start={{x:0, y:0}}
                end={{x:1, y:0}}
                style={styles.updateButton}
            >
                <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                    <Text style={styles.updateText}>Update</Text>
                </TouchableOpacity>
            </LinearGradient>

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
    row:{
        marginLeft:"auto",
        marginRight:"auto",
        display:"flex",
        flexDirection:"row",
        gap:10,
        marginBottom:10,
        width:"90%",
        height:50
    },
    textBoxes:{
        width:"100%",
        backgroundColor:"white",
        borderRadius:30,
        paddingLeft:10,
        boxShadow: `0px 4px 4px 0px ${primary}`
    },
    updateButton:{
        width:200,
        height:50,
        borderRadius:30,
        marginLeft:"auto",
        marginRight:"auto",
        marginTop:"auto",
        marginBottom:30,
    },
    updateText:{
        fontFamily:"RobotoRegular",
        fontSize:30,
        margin:"auto",
        color:"white"
    }
});