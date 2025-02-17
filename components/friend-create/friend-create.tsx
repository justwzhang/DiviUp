import { faPlus, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { gray200, gray400, primary, secondary } from "@styles/variables";
import FriendListSection from "components/friends-screen-list/components/friend-list-section";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { View, TouchableOpacity, TextInput, FlatList, StyleSheet, Text } from "react-native";
import { useStore } from "store";

export default function FriendCreate(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const store = useStore().store;
    const nav = useNavigation();
    const [fontsLoaded] = useFonts({
        RobotoRegular: require("@fonts/Roboto-Regular.ttf"),
    });


    function handleCreate(){
        return store.createNewFriend({id:store.nextFriendId,firstName:firstName, lastName:lastName},nav)
    }

    return (
        <View style={styles.screenContainer}>
            <Text style={styles.titleCard}>Add New Friend</Text>
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
                style={styles.createButton}
            >
                <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
                    <Text style={styles.createText}>Create</Text>
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
    createButton:{
        width:200,
        height:50,
        borderRadius:30,
        marginLeft:"auto",
        marginRight:"auto",
        marginTop:"auto",
        marginBottom:30,
    },
    createText:{
        fontFamily:"RobotoRegular",
        fontSize:30,
        margin:"auto",
        color:"white"
    }
});