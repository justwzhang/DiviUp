import { FlatList, StyleSheet, Text, View } from "react-native";
import { FriendsListType } from "../friends-screen-list";
import { useFonts } from "expo-font";
import { gray400 } from "@styles/variables";
import FriendCard from "./friend-card";

interface FriendListSectionPropType{
    section:FriendsListType
}

export default function FriendListSection(props:FriendListSectionPropType){
    const [fontsLoaded] = useFonts({
        RobotoRegular: require("@fonts/Roboto-Regular.ttf"),
        RobotoBold: require("@fonts/Roboto-Bold.ttf")
    });
    const {firstInitial, friends} = props.section;
    return (
        <View style={styles.container}>
            <Text style={styles.firstInitial}>{firstInitial.toUpperCase()}</Text>
            <FlatList
                style={styles.friendsList}
                data={friends}
                renderItem={({item})=>(<FriendCard friend={item}/>)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        marginTop:10,
        // backgroundColor:"blue",
        width:"90%",
        // height: 30,
        marginRight:"auto",
        marginLeft:"auto",
        display: "flex",
        
        
        // borderRadius:30,
        // boxShadow: `0px 4px 4px 0px ${primary}`
    },
    firstInitial:{
        fontFamily:"RobotoBold",
        color: gray400,
        fontSize:30,
        marginBottom:5,
        borderBottomColor: gray400,
        borderBottomWidth: 2
    },
    friendsList:{
        flex:1,
        display:"flex",
        flexDirection:"column",
        overflow:"scroll",
        gap: 10,
        paddingBottom: 10
    }
});
