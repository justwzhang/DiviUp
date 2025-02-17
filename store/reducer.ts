import { Dispatch, SetStateAction } from "react";
import { StoreReducerActionType, StoreType } from "utils/types/store-types";

export const GlobalStoreActionType = {
    SWAP_SCREENS: "SWAP_SCREENS",
    INIT_STORE: "INIT_STORE",
    ADD_FRIEND: "ADD_FRIEND",
    UPDATE_FRIEND: "UPDATE_FRIEND",
}

export function storeReducer(action:StoreReducerActionType, store:StoreType, setStore:Dispatch<SetStateAction<StoreType>>){
    const { type, payload } = action;
    switch (type){
        case GlobalStoreActionType.SWAP_SCREENS: {
            return setStore({
                ...store,
                selectedBottom: payload.selectedBottom?? store.selectedBottom
            });
        }
        case GlobalStoreActionType.INIT_STORE: {
            return setStore({
                ...store,
                reciepts: payload.reciepts ?? store.reciepts,
                friends: payload.friends ?? store.friends,
                nextFriendId: payload.nextFriendId ?? store.nextFriendId
            })
        }
        case GlobalStoreActionType.ADD_FRIEND: {
            return setStore({
                ...store,
                friends:payload.friends ?? store.friends,
                nextFriendId: payload.nextFriendId ?? store.nextFriendId,
            })
        }
        case GlobalStoreActionType.UPDATE_FRIEND: {
            return setStore({
                ...store,
                friends:payload.friends ?? store.friends,
            })
        }
    }
}