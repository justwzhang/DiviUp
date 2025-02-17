import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { gray600, primary } from "@styles/variables";
import { useFonts } from "expo-font";
import { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Receipt } from "utils/types/store-types";
import { faUser } from "@fortawesome/free-solid-svg-icons"; 
interface ReceiptCardPropsType{
    receipt: Receipt
}

export default function ReceiptCard(props:ReceiptCardPropsType){
    const [fontsLoaded] = useFonts({
        RobotoRegular: require("@fonts/Roboto-Regular.ttf"),
        RobotoBold: require("@fonts/Roboto-Bold.ttf")
    });
    const receipt = props.receipt;
    const dateStr = useMemo(()=>{
        const dateNoDay = receipt.date.toDateString().split(" ").splice(1);
        return dateNoDay.join(" ")
    },[]);
    return(
        <View style={styles.mainContainer}>
            <View style={styles.innerContainer}>
                <View style={styles.rowContainer}>
                    <Text style={styles.leftCol}>{receipt.name}</Text>
                    <Text style={styles.rightCol}>{'$' + receipt.total}</Text>
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.leftColDate}>{dateStr}</Text>
                    <View style={styles.numPeople}>
                        <Text style={styles.rightCol}>{receipt.numPeople}</Text>
                        <FontAwesomeIcon icon={faUser} size={20} style={styles.personIcon}/>
                    </View>
                    
                </View>
                
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer:{
        marginTop:20,
        backgroundColor:"white",
        width:"90%",
        height: 100,
        marginRight:"auto",
        marginLeft:"auto",
        borderRadius:30,
        boxShadow: `0px 4px 4px 0px ${primary}`
    },
    innerContainer:{
        width:"90%",
        height:"80%",
        margin:"auto",
        display:"flex",
        flexDirection:"column"
    },
    rowContainer:{
        display:"flex",
        flexDirection:"row",
        width:"100%",
        height:"50%",
        marginTop:5,
    },
    leftCol:{
        fontFamily:"RobotoBold",
        fontSize:20,
        width: "80%",
    },
    leftColDate:{
        fontFamily:"RobotoRegular",
        fontSize:20,
        width: "80%",
        color:gray600
    },
    rightCol:{
        fontFamily:"RobotoRegular",
        fontSize:20,
        width: "20%",
        justifyContent:"flex-end",
        textAlign:"right",
    },
    numPeople:{
        height:"100%",
        width:"20%",
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-end"
    },
    personIcon:{
        marginLeft:5,
    }

})