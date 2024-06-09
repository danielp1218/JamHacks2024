'use client';

import {useContext, useEffect, useState} from "react";
import {NearContext} from "@/context";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem, Button, Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell, getKeyValue
} from "@nextui-org/react";

export default function App() {
    const {signedAccountId, wallet} = useContext(NearContext);
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const getDate = () => {
        const currentdate = new Date();
        return currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();
    }

    let iconStyles = { background: "#3f4a5c"};
    let items: {key: string, label: string}[] = [];
    useEffect(() => {
        setLoggedIn(!!signedAccountId);
        if(signedAccountId){
            fetch(`/api/user?${signedAccountId}`, {method: "GET"}).then(async (data) => {
                const json = await data.json();
                setUser(json);
                let i = 0;
                json.patients.forEach((patient:string) => {
                    items.push({key: `${i}`, label:patient});
                    i += 1;
                });
            });
        }
    }, [signedAccountId]);

    const rows = [
        {
            key: "1",
            date: "April 1, 2021",
            conditions: ["Diabetes", "Hypertension"]
        },
        {
            key: "2",
            date: "April 1, 2021",
            conditions: ["Diabetes", "Hypertension"]
        },];

    const columns = [
        {
            key: "date",
            label: "DATE",
        },
        {
            key: "conditions",
            label: "CONDITIONS",
        }
    ];

    const [encodeImageFileAsURL, setEncodeImageFileAsURL] = useState(() => {});

    useEffect(() => {
        setEncodeImageFileAsURL (() => {
            let filesSelected = (document.getElementById("inputFileToLoad") as HTMLInputElement)!.files!;
            if (filesSelected.length > 0) {
                let fileToLoad = filesSelected[0];

                let fileReader = new FileReader();

                fileReader.onload = function(fileLoadedEvent) {
                    let srcData = fileLoadedEvent.target!.result; // <--- data: base64

                    let newImage = document.createElement('img');
                    newImage.src = srcData! as string;

                    document.getElementById("imgTest")!.innerHTML = newImage.outerHTML;
                    const b64 = document.getElementById("imgTest")!.innerHTML;
                    console.log("Converted Base64 version is " + b64);
                    const response = fetch('https://platypus-splendid-rattler.ngrok-free.app/'+b64, {
                        method: 'GET'
                    });
                    console.log(response);
                }
                fileReader.readAsDataURL(fileToLoad);

            }

        });
    });

    return (
        <main>
            <div className="w-[30%] flex h-screen">
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            variant="bordered"
                        >
                            Patients
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Dynamic Actions" items={items}>
                        {(item) => (
                            <DropdownItem
                                key={item.key}
                                color={"default"}
                            >
                                {item.label}
                            </DropdownItem>
                        )}
                    </DropdownMenu>
                </Dropdown>
                <Table aria-label="Dynamic table">
                    <TableHeader columns={columns}>
                        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody items={rows}>
                        {(item) => (
                            <TableRow key={item.key}>
                                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <input id="inputFileToLoad" type="file" onChange={encodeImageFileAsURL} />
            <div id="imgTest"></div>
        </main>
    )
}