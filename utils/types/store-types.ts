import { Dispatch, SetStateAction } from "react";

export interface StoreFunctions {
    changeScreen: any
}

export interface StoreType extends Partial<StoreFunctions>{
    selectedBottom: 'r' | 'f',


    
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
};