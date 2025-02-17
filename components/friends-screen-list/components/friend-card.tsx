import { primary } from "@styles/variables";
import { useFonts } from "expo-font";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { Friend } from "utils/types/store-types";

interface FriendCardPropType{
    friend: Friend
}

export default function FriendCard(props: FriendCardPropType){
    const [fontsLoaded] = useFonts({
        RobotoRegular: require("@fonts/Roboto-Regular.ttf"),
        RobotoBold: require("@fonts/Roboto-Bold.ttf")
    });
    const friend = props.friend;
    return(
        <View style={styles.container}>
            <Text style={styles.nameContainer}>{friend.firstName} {friend.lastName}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop:10,
        backgroundColor:"white",
        width:"90%",
        height: 30,
        marginRight:"auto",
        marginLeft:"auto",
        borderRadius:30,
        boxShadow: `0px 4px 4px 0px ${primary}`
    },
    nameContainer:{
        fontFamily:"RobotoRegular",
        fontSize: 20,
        marginLeft: 20,
        marginTop:"auto",
        marginBottom: "auto"
    }
});