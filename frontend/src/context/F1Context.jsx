import { createContext, useEffect, useState } from "react";
import{f1_list} from "../assets/frontend_assets/assets";

export const F1Context = createContext(null)

const F1ContextProvider = (props) => {

    const contextValue = {
        f1_list,
    }
    return (
        <F1Context.Provider value={contextValue}>
            {props.children}
        </F1Context.Provider>
    )
}

export default F1ContextProvider;