'use client';

import {useContext, useEffect, useState} from "react";
import {VerticalTimeline, VerticalTimelineElement} from "react-vertical-timeline-component";
import {NearContext} from "@/context";
import "react-vertical-timeline-component/style.min.css";
import {Button} from "@nextui-org/react";
import {ArrowIcon} from './ArrowIcon';
import {AddIcon} from './AddIcon';

export default function HelloNear() {
    const {signedAccountId, wallet} = useContext(NearContext);
    const [loggedIn, setLoggedIn] = useState(false);

    // reroute to qr code

    // reroute to diff page depending on doctor status
    

    let iconStyles = { background: "#3f4a5c"};
    useEffect(() => {
        setLoggedIn(!!signedAccountId);
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
            <div className="relative w-full flex flex-col justify-content-end align-items-end pt-32 pr-10 space-y-5">
                <Button isIconOnly color="primary" aria-label="Like">
                    <AddIcon />
                </Button>
                <Button isIconOnly color="primary" aria-label="Like">
                    <ArrowIcon />
                </Button>   
            </div>
        </main>
    )
}