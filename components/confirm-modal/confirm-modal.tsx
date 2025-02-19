import { primary, secondary } from "@styles/variables";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface ConfirmModalPropType{
    onApprove:any
    onCancel:any,
    title:string,
    visible:boolean
}

export default function ConfirmModal(props:ConfirmModalPropType){
    const [fontsLoaded] = useFonts({
        RobotoRegular: require("@fonts/Roboto-Regular.ttf"),
    });
    const {onApprove, onCancel, title, visible} = props;

    function handleApprove(){return onApprove();}
    function handleCancel(){return onCancel();}

    return(
        
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={()=>{
                onCancel();
            }}
        >
            <View
                style={styles.modalBackground}
            >
                <View style={styles.modalBox}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.buttonGroup}>
                    <LinearGradient
                        colors={[primary, secondary]}
                        start={{x:0, y:0}}
                        end={{x:1, y:0}}
                        style={styles.button}
                    >
                        <TouchableOpacity onPress={()=>{handleCancel()}}>
                            <Text style={styles.buttonText}>No</Text>
                        </TouchableOpacity>
                    </LinearGradient>

                    <LinearGradient
                        colors={[primary, secondary]}
                        start={{x:0, y:0}}
                        end={{x:1, y:0}}
                        style={styles.button}
                    >
                        <TouchableOpacity onPress={()=>{handleApprove()}}>
                            <Text style={styles.buttonText}>Yes</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    </View>
                    
                </View>
                
            </View>
        </Modal>

    );
}

const styles = StyleSheet.create({
    modal:{
        width: "50%",
        height:"50%",
        backgroundColor:'transparent'
    },
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, .5)", // Semi-transparent overlay
        justifyContent: "center",
        alignItems: "center",
    },
    modalBox:{
        width: "75%",
        backgroundColor:"white",
        borderRadius: 30,
        boxShadow: `0px 4px 12px 0px ${primary}`
    },
    title:{
        fontFamily:"RobotoRegular",
        fontSize:16,
        width:"80%",
        marginLeft:"auto",
        marginRight:"auto",
        marginTop:20,
    },
    buttonGroup:{
        display:"flex",
        flexDirection:"row",
        width:"100%",
        justifyContent:"space-around",
        paddingTop:50,
        paddingBottom:20
    },
    button:{
        borderRadius:30,
        width:100
    },
    buttonText:{
        fontFamily:"RobotoRegular",
        fontSize:30,
        margin:"auto",
        color:"white", 
    }

});