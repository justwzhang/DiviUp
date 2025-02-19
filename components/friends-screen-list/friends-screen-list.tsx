import { faPlus, faFilter, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { gray200, gray400, primary } from "@styles/variables";
import ReceiptCard from "components/receipts-screen-list/components/receipt-card";
import { useMemo, useState } from "react";
import { FlatList, TextInput, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useStore } from "store";
import { friendsEx } from "utils/constants/example-data/ex-friends";
import FriendCard from "./components/friend-card";
import { Friend } from "utils/types/store-types";
import FriendListSection from "./components/friend-list-section";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "utils/types/store-types";
import * as Contacts from 'expo-contacts';
import ConfirmModal from "components/confirm-modal/confirm-modal";

export interface FriendsListType{
    firstInitial: string,
    friends: Friend[]
}

export default function FriendsScreenList(){
    const [filterStr, setFilterStr] = useState("");
    const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
    const [visible, setVisible] = useState(false);

    const store = useStore().store;
    const nav = useNavigation<NavigationProp<RootStackParamList>>();

    const friendsFiltered =  store.friends.filter((f)=>{return filterStr == "" || f.firstName.toLowerCase().includes(filterStr) || f.lastName.toLowerCase().includes(filterStr)}).sort((f1,f2)=>{return f1.firstName.localeCompare(f2.firstName)});
    const friendsList = useMemo(()=>{
        const map = new Map<string, Friend[]>();
        friendsFiltered.map((f)=>{
            const firstInitial = f.firstName.charAt(0)
            if (map.has(firstInitial)) map.get(firstInitial)?.push(f);
            else map.set(firstInitial, [f]);
        });
        const list:FriendsListType[] = [];
        map.forEach((val, key)=>{
            list.push({firstInitial:key, friends:val});
        });
        return list;
    }, [friendsFiltered])
    
    function addFriend(){
        nav.navigate("FriendCreate");
    }

    async function importContacts(){
        const { status } = await Contacts.requestPermissionsAsync();
        if(status === 'granted'){
            const {data} = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.FirstName, Contacts.Fields.LastName]
            })
            if(data.length > 0){
                setContacts(data);
                setVisible(true);
                // store.uploadContacts(data);
            }
        }
    }

    async function finishUpload(){
        store.uploadContacts(contacts);
        setVisible(false);
    }

    function cancelModal(){
        setVisible(false);
    }

    return (
    <View style={styles.screenContainer}>
        <Text style={styles.titleCard}>All Friends</Text>
        <View style={styles.utilBar}>
            <TouchableOpacity onPress={addFriend}>
                <FontAwesomeIcon icon={faPlus} size={30} style={styles.utilButton}/>
            </TouchableOpacity>
            <TextInput style={styles.searchBox} placeholder={"Filter Name or Date"} onChangeText={setFilterStr}/>
            <TouchableOpacity onPress={importContacts}>
                <FontAwesomeIcon icon={faUpload} size={30} style={styles.utilButton}/>
            </TouchableOpacity>
        </View>
        <FlatList 
            style={styles.friendsList}
            data={friendsList}
            renderItem={({item})=>( <FriendListSection section={item}/>)}
        />
        <ConfirmModal visible={visible} onApprove={finishUpload} onCancel={cancelModal} title="Importing contacts will overwrite the existing friends are you sure you want to continue?"/>
        

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