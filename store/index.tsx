import { createContext, ReactElement, ReactNode, useContext, useEffect, useState } from "react";
import { RootStackParamList, StoreContextType, StoreType } from "../utils/types/store-types";
import { GlobalStoreActionType, storeReducer } from "./reducer";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { receiptEx } from "utils/constants/example-data/ex-reciept";
import { friendsEx } from "utils/constants/example-data/ex-friends";

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
    });


    useEffect(()=>{
        // TODO this is just using example data, we need to import data down the line
        return storeReducer({
            type:GlobalStoreActionType.INIT_STORE,
            payload:{reciepts: receiptEx, friends: friendsEx}
        }, store, setStore);
    },[]);

    store.changeScreen = function(val:"r"|"f", navigation:NavigationProp<RootStackParamList>){ 
        if (val == "r") navigation.navigate('ReceiptsList');
        else navigation.navigate('FriendsList');
        return storeReducer({
            type: GlobalStoreActionType.SWAP_SCREENS, 
            payload:{selectedBottom: val}
        }, store, setStore); 
    }


    return (
        <GlobalStoreContext.Provider value={{ store, setStore }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export { GlobalStoreContextProvider, useStore };