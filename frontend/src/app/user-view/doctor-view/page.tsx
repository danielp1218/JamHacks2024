'use client';

import {useContext, useEffect, useState} from "react";
import {NearContext} from "@/context";
import {QrcodeModal} from "@/components/qrcodeModal";
import "react-vertical-timeline-component/style.min.css";

export default function App() {
    const {signedAccountId, wallet} = useContext(NearContext);
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    let iconStyles = { background: "#3f4a5c"};
    useEffect(() => {
        setLoggedIn(!!signedAccountId);
        if(signedAccountId){
            fetch(`/api/user?${signedAccountId}`, {method: "GET"}).then(async (data) => {
                const json = await data.json();
                setUser(json);
            });
        }
    }, [signedAccountId]);

    return (
        <main>

        </main>
    )
}