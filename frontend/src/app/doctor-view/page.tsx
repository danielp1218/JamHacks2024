'use client';

import {useContext, useEffect, useState} from "react";

import {NearContext} from "@/context";
import {Button} from "@nextui-org/react";

export default function App() {
    const {signedAccountId, wallet} = useContext(NearContext);
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    
    return (
        <main>
            <div className="">
                Hello World 
            </div>
        </main>
    )
}