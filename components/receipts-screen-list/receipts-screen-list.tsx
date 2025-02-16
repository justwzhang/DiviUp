import { View, Text, StyleSheet } from "react-native";

export default function ReceiptsScreenList(){
    console.log("test")
    return (
    <View style={styles.screenContainer}>
        <Text>All Receipts</Text>
    </View>
    );
}

const styles =StyleSheet.create({
    screenContainer:{
        display:"flex",
        flexDirection:"column",
    },
    titleCard:{
        
    }
});