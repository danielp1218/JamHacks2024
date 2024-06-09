'use client';

import {useContext, useEffect, useState, Suspense} from "react";
import {NearContext} from "@/context";
import {redirect, useSearchParams} from 'next/navigation';
import {Button} from "@nextui-org/button";
import {Link} from "@nextui-org/react";

export default function App() {
    const {signedAccountId, wallet} = useContext(NearContext);
    const [loggedIn, setLoggedIn] = useState(false);
    const [response, setResponse] = useState("");
    const [patientId, setPatientId] = useState("");
    const [name, setName] = useState("_");

    useEffect(()=>{
        setPatientId(useSearchParams().get('patientId') as string);
        fetch("/api/userName?"+patientId, {
            method: "GET",
        }).then(async (res) =>{
            const patientInfo = await res.json();
            setName(patientInfo.name);
        } );
    });


    useEffect(() => {
        if (signedAccountId) {
            setLoggedIn(true);
            fetch(`/api/addPatient`, {
                method: 'POST',
                body: JSON.stringify({doctorWallet: signedAccountId, patientID: patientId}),
            }).then(async (res) => {
                const {message} = await res.json();
                setResponse(message);
            });
        }
    }, [signedAccountId]);

    return (
        <div className="w-full h-full flex flex-column justify-content-center items-center pt-56 p-32">
            <Suspense>
                <h1 className="text-4xl font-bold">Sign in to become <span className="font-bold text-blue-400">{name}'s</span> doctor!</h1>
                {!loggedIn ? (

                    <Button
                        className="mt-6"
                        onClick={async () => {
                            await wallet.signIn();
                        }}
                    >
                        Sign in with Wallet
                    </Button>
                ) : (
                    <>
                        <p className="text-center pt-6 text-xl">{response}</p>
                        <Link showAnchorIcon href="/user-view">View on the dashboard</Link>
                    </>
                )}
            </Suspense>
        </div>
    )
}