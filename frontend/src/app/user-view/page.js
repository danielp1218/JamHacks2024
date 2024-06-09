'use client';

import {useContext, useEffect, useState} from "react";
import {VerticalTimeline, VerticalTimelineElement} from "react-vertical-timeline-component";
import {NearContext} from "@/context";
import {QrcodeModal} from "@/components/qrcodeModal";
import "react-vertical-timeline-component/style.min.css";
import {Button} from "@nextui-org/react";
import {ArrowIcon} from './ArrowIcon';
import {AddIcon} from './AddIcon';

export default function App() {
    const {signedAccountId, wallet} = useContext(NearContext);
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);


    // reroute to qr code

    // reroute to diff page depending on doctor status
    

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

    let timelineElements = [
        {
            date: "march",
            diagnosis: "you got cancer",
        },
        {
            date: "april",
            diagnosis: "you went bald",
        },
        {
            date: "may",
            diagnosis: "you got better",
        },
    ]
    
    return (
        <main>
            <div className="m-10">
                <VerticalTimeline>
                    {timelineElements.map((element) => {
                        return (
                            <VerticalTimelineElement
                                key={element.key}
                                date={element.date}
                                visible={true}
                                iconStyle={iconStyles}
                            >
                                <h3 className="vertical-timeline-element-title">{element.diagnosis}</h3>
                            </VerticalTimelineElement>
                        )
                        })
                    }
                </VerticalTimeline>
            </div>
            <div className="fixed bottom-16 right-10">
                {/* <Button isIconOnly color="primary" aria-label="Like">
                    <AddIcon />
                </Button> */}
                <a href="/user-view/doctor-view">
                <Button isIconOnly color="primary" aria-label="Like">
                    <ArrowIcon />
                </Button>
                </a>
            </div>
            <div className="fixed bottom-3 right-3">
                <QrcodeModal id={user?user.uuid:""}/>
            </div>
        </main>
    )
}