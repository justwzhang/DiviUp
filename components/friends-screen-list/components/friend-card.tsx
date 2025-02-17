import { NavigationProp, useNavigation } from "@react-navigation/native";
import { primary } from "@styles/variables";
import { useFonts } from "expo-font";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { Friend, RootStackParamList } from "utils/types/store-types";

interface FriendCardPropType{
    friend: Friend
}

export default function FriendCard(props: FriendCardPropType){
    const [fontsLoaded] = useFonts({
        RobotoRegular: require("@fonts/Roboto-Regular.ttf"),
        RobotoBold: require("@fonts/Roboto-Bold.ttf")
    });
    const nav = useNavigation<NavigationProp<RootStackParamList>>();
    const friend = props.friend;

    function editFriend(){
        nav.navigate('FriendEdit', {friend: friend});
    }

    return(
        <TouchableOpacity style={styles.container} onPress={editFriend}>
            <Text style={styles.nameContainer}>{friend.firstName} {friend.lastName}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop:10,
        backgroundColor:"white",
        width:"100%",
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