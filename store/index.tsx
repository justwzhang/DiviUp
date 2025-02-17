import { createContext, ReactElement, ReactNode, useContext, useEffect, useState } from "react";
import { Friend, RootStackParamList, StoreContextType, StoreType } from "../utils/types/store-types";
import { GlobalStoreActionType, storeReducer } from "./reducer";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { receiptEx } from "utils/constants/example-data/ex-reciept";
import { friendsEx, nextFriendIdEX } from "utils/constants/example-data/ex-friends";

export const GlobalStoreContext = createContext<StoreContextType | undefined>(undefined);

function useStore(): StoreContextType{
    const store = useContext(GlobalStoreContext);
    if(!store){
        throw new Error("Store did not init");
    }
    return store; 
}



function GlobalStoreContextProvider(props: {children: ReactNode }): ReactElement{
    const [store, setStore] = useState<StoreType>({
        reciepts:[],
        friends:[],
        selectedBottom: 'r',
        nextFriendId: 0,
    });


    useEffect(()=>{
        // TODO this is just using example data, we need to import data down the line
        return storeReducer({
            type:GlobalStoreActionType.INIT_STORE,
            payload:{reciepts: receiptEx, friends: friendsEx, nextFriendId: nextFriendIdEX}
        }, store, setStore);
    },[]);


    //
    // Navigation Functions
    //
    //
    /**
     * 
     * @param val the new screen to navigate to
     * @param navigation the navigation object to change the screen
     * @returns new state
     */
    store.changeScreen = function(val:"r"|"f", navigation:NavigationProp<RootStackParamList>){ 
        if (val == "r") navigation.navigate('ReceiptsList');
        else navigation.navigate('FriendsList');
        return storeReducer({
            type: GlobalStoreActionType.SWAP_SCREENS, 
            payload:{selectedBottom: val}
        }, store, setStore); 
    }



    //
    // Friend Functions
    //
    //
    /**
     * 
     * @param friend the new friend to add into list
     * @param navigation the navigation object to change the screen
     * @returns 
     */
    store.createNewFriend = function(friend:Friend, navigation:NavigationProp<RootStackParamList>){
        const newFriends = [...store.friends, friend]
        navigation.navigate('FriendsList');
        return storeReducer({
            type: GlobalStoreActionType.ADD_FRIEND,
            payload:{friends:newFriends, nextFriendId: friend.id + 1}
        }, store, setStore)
        // TODO: save to local storage
    }


    store.updateFriend = function(friend:Friend, navigation:NavigationProp<RootStackParamList>){
        const newFriends = store.friends.filter((f)=>{return f.id != friend.id});
        newFriends.push(friend);
        navigation.navigate('FriendsList');
        return storeReducer({
            type:GlobalStoreActionType.UPDATE_FRIEND,
            payload:{friends:newFriends}
        },store, setStore);
    }
    
    return (
        <GlobalStoreContext.Provider value={{ store, setStore }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export { GlobalStoreContextProvider, useStore };