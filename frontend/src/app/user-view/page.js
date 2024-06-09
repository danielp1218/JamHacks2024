'use client';

import {useContext, useEffect, useState} from "react";
import {NearContext} from "@/context";

export default function HelloNear() {
    const {signedAccountId, wallet} = useContext(NearContext);
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        setLoggedIn(!!signedAccountId);
    }, [signedAccountId]);
    return (
        <main>
            <div>
                <p>
                    {loggedIn ? `Hello, ${signedAccountId}!` : 'Please sign in'}
                </p>
            </div>
        </main>
    )
}