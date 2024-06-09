import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import QRCode from "react-qr-code";
import {useEffect, useState} from "react";

// @ts-ignore
export function QrcodeModal({id}) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [url, setUrl] = useState("");
    useEffect(()=>{
        setUrl(document.URL.toString().replace(/^(.*\/\/[^\/?#]*).*$/,"$1") + "/add-doctor?patientId=" + id);
    });

    return (
        <>
            <div className="">
                <Button onPress={() =>onOpen()} color="primary" className="p-0 w-[40px]">+</Button>

            </div>

            <Modal
                size={"md"}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Doctor Scan</ModalHeader>
                            <ModalBody>
                                <p>
                                    Get a doctor to scan this QR code to add each other. {url}
                                </p>
                                <QRCode value={url}/>
                            </ModalBody>
                            <ModalFooter className="w-full flex justify-content-center">
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}