import { Dispatch, SetStateAction } from "react";
import { StoreReducerActionType, StoreType } from "utils/types/store-types";

export const GlobalStoreActionType = {
    SWAP_SCREENS: "SWAP_SCREENS",
    INIT_STORE: "INIT_STORE",
}

export function storeReducer(action:StoreReducerActionType, store:StoreType, setStore:Dispatch<SetStateAction<StoreType>>){
    const { type, payload } = action;
    switch (type){
        case GlobalStoreActionType.SWAP_SCREENS: {
            setStore({
                ...store,
                selectedBottom: payload.selectedBottom?? store.selectedBottom
            });
        }
        case GlobalStoreActionType.INIT_STORE: {
            setStore({
                ...store,
                reciepts: payload.reciepts ?? store.reciepts,
                friends: payload.friends ?? store.friends
            })
        }
    }
}