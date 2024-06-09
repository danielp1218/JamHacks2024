'use client';
import React, {FormEvent, useContext, useState} from "react";
import {Button, Card, CardBody, CardFooter, CardHeader, Divider, Input} from "@nextui-org/react";
import {NearContext} from "@/context";


export default function App() {
    const { signedAccountId, wallet } = useContext(NearContext);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [loaded, setLoaded] = useState(false);
    const userExists = async (wallet: string) => {
        const response = await fetch(`/api/userExists?${wallet}`);
        return await response.json();
    }

    userExists(signedAccountId).then((exists) => {if(exists) window.location.replace("/user-view")});
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        console.log("submit")
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        formData.append('wallet', signedAccountId);
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        console.log(formData);
        const response = await fetch('/api/addUser', {
            method: 'POST',
            body: formData,
        })

        console.log(response.status);
        if(response.status === 200) {
            window.location.replace("/user-view");
        } else{
            alert(response.body);
        }
    }

    return (
        <div className="relative w-full flex justify-content-center align-items-center pt-32">
            <Card className="w-80">
                <CardHeader className="flex gap-3">
                    <p className="text-3xl text-center w-full font-bold pt-2">Register</p>
                </CardHeader>
                <Divider/>
                <form onSubmit={onSubmit}>
                    <CardBody>
                        <Input value={firstName} onValueChange={setFirstName} placeholder="John" label="First Name" type="text" id="First Name" isRequired/>
                        <Input value={lastName} onValueChange={setLastName} className="pt-2" placeholder="Doe" label="Last Name" type="text" id="Last Name" isRequired/>
                    </CardBody>
                    <Divider/>
                    <CardFooter>
                        <Button type="submit">
                            Register
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}