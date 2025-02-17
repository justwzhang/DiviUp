import { NavigationProp } from "@react-navigation/native";
import { Dispatch, SetStateAction } from "react";

export interface StoreFunctions {
    changeScreen: any,
    createNewFriend: any,
    updateFriend: any
}

export interface StoreType extends Partial<StoreFunctions>{
    selectedBottom: 'r' | 'f',
    reciepts: Receipt[],
    friends: Friend[],
    nextFriendId: number,
}

export interface StoreContextType {
    store: StoreType,
    setStore: Dispatch<SetStateAction<StoreType>>
}

export interface StoreReducerActionType{
    type:string, 
    payload:Partial<StoreType>
}

export type RootStackParamList = {
    ReceiptsList: undefined; 
    FriendsList: undefined; 
    FriendCreate: undefined;
    FriendEdit: { friend: Friend };
};

export interface Receipt{
    name: string,
    date: Date,
    total: number,
    numPeople: number,
    //TODO need type for each entry of the reciept and friends

}

export interface Friend{
    id:number,
    firstName: string,
    lastName:string,
}