'use client';

import {useContext, useEffect, useState} from "react";
import {NearContext} from "@/context";
import {QrcodeModal} from "@/components/qrcodeModal";

export default function HelloNear() {
    const {signedAccountId, wallet} = useContext(NearContext);
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

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
            <div>
                <p>
                    {loggedIn ? `Hello, ${signedAccountId}!` : 'Please sign in'}
                </p>
            </div>
            <div className="fixed bottom-3 right-3">
                <QrcodeModal id={user?user.uuid:""}/>
            </div>
        </main>
    )
}