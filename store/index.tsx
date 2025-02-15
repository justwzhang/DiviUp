import { createContext, ReactElement, ReactNode, useContext, useState } from "react";
import { StoreContextType } from "./types";



export const GlobalStoreContext = createContext<StoreContextType | undefined>(undefined);

function useStore(): StoreContextType{
    const store = useContext(GlobalStoreContext);
    if(!store){
        throw new Error("Store did not init");
    }
    return store; 
}


function GlobalStoreContextProvider(props: {children: ReactNode }): ReactElement{
    const [store, setStore] = useState({
        test: "test",
    });

    return (
        <GlobalStoreContext.Provider value={{ store }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export { GlobalStoreContextProvider, useStore };