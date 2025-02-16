import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { gray800, tertiary } from "@styles/variables";
import { useStore } from "store";
import { useFonts } from "expo-font";
export default function Footer(){
    const [fontsLoaded] = useFonts({
        RobotoRegular: require("@fonts/Roboto-Regular.ttf"),
      });
    const store = useStore().store;
    function changeScreen(val:string){
        store.changeScreen(val);
    }
    return(
        <View style={styles.footerContainer}>
            <TouchableOpacity onPress={()=>changeScreen('r')}>
                <View style={styles.navCard}>
                    <FontAwesomeIcon icon={faFolderOpen} style={store.selectedBottom == 'r'?styles.selectedScreenIcon:styles.otherScreenIcon} size={30}/>
                    <Text style={store.selectedBottom == 'r'?styles.selectedScreenText:styles.otherScreenText}> Receipts </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>changeScreen('f')}>
                <View style={styles.navCard}>
                    <FontAwesomeIcon icon={faPeopleGroup} style={store.selectedBottom == 'f'?styles.selectedScreenIcon:styles.otherScreenIcon} size={30}/>
                    <Text style={store.selectedBottom == 'f'?styles.selectedScreenText:styles.otherScreenText}> Friends </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    footerContainer:{
        height: 100,
        backgroundColor: "black",
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around"
    },
    navCard:{
        justifyContent:"center",
        display:"flex",
        flexDirection:"column",
        paddingTop:10

    },
    selectedScreenIcon:{
        color: tertiary,
        margin:"auto",
    },
    otherScreenIcon:{
        color: gray800,
        margin:"auto",
    },
    selectedScreenText:{
        color: tertiary,
        fontSize:18,
        fontFamily:"RobotoRegular",
    },
    otherScreenText:{
        color: gray800,
        fontSize:18,
        fontFamily:"RobotoRegular",
    }


});
