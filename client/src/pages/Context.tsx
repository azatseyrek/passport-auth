import Axios from 'axios';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';

export const myContext = createContext<any>({})

const Context = (props: PropsWithChildren<any>) => {
    const [user, setUser] = useState<any>()
    useEffect(()=> {
        Axios.get("http://localhost:4000/user", {withCredentials:true}).then(res => {
            setUser(res.data)
        })
    },[])


    return (
        <myContext.Provider value={user}>
            {props.children}
        </myContext.Provider>
    )
};

export default Context;
