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
            name: "John Smith",
            conditions: ["Diabetes", "Hypertension"]
        },
        {
            key: "2",
            name: "Bob Smith",
            conditions: ["Diabetes", "Hypertension"]
        },];

    const columns = [
        {
            key: "name",
            label: "NAME",
        },
        {
            key: "conditions",
            label: "CONDITIONS",
        }
    ];

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

        </main>
    )
}