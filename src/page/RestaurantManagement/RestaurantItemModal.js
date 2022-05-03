import {
    Button, Center, chakra, Image,
    Modal, ModalBody,
    ModalCloseButton, ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    Radio,
    RadioGroup,
    Stack,
    useToast
} from "@chakra-ui/react";
import React from 'react';
import { RestaurantItemForm } from "./RestaurantItemForm";
import { HighModal } from "../../components/HighModal";
import { useCRUD } from "../../hooks/useCRUD";
import { useUserContext } from "../../hooks/useUserContext";
import { useGetDocuments } from "../../hooks/useGetDocuments";
import { useEffect, useMemo, useState } from "react";
import {projectFirestore} from "../../firebase/config";
import firebase from "firebase/compat/app";
// Wraps a HighModal and inserts a FoodItemForm
export const RestaurantItemModal = ({ data, status, isOpen, onClose, onOpen }) => {
    const [scrollBehavior, setScrollBehavior] = React.useState('outside')

    const Approve = async () => {
        const starCountRef = projectFirestore.collection('Restaurants').doc(data.id)
        const res = await starCountRef.update({
            status: "accepted",
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        window.location.reload(false);
    }
    const Decline = async () => {
        const starCountRef = projectFirestore.collection('Restaurants').doc(data.id)
        const res = await starCountRef.update({
            status: "declined",
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        window.location.reload(false);
    }

    const btnRef = React.useRef()
    return (
        <>
            <Modal
                onClose={onClose}
                finalFocusRef={btnRef}
                isOpen={isOpen}
                scrollBehavior={scrollBehavior}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{data.name}</ModalHeader>
                    <Center>
                    <Image
                        borderRadius="lg"
                        width={{ md: 80 }}
                        mb={5}
                        mt={5}
                        src={"https://bit.ly/2jYM25F"}
                        alt="restaurant image"
                    />
                    </Center>
                    <ModalCloseButton />
                    <ModalBody>
                        {data.description}
                    </ModalBody>
                    <ModalFooter>
                        {
                            status !== 1 ?
                                <chakra.button
                                    px={3}
                                    py={3}
                                    mt={2}
                                    bg="green.200"
                                    fontSize="xs"
                                    color="gray.900"
                                    fontWeight="bold"
                                    rounded="lg"
                                    textTransform="uppercase"
                                    _hover={{
                                        bg: "green.700",
                                        color: "gray.100"
                                    }}
                                    _focus={{
                                        bg: "gray.400",
                                    }}
                                    onClick={() => Approve()}
                                >
                                    Approve
                                </chakra.button> : null
                        }
                        {
                            status !== 2 ?
                                <chakra.button
                                    px={3}
                                    py={3}
                                    mt={2}
                                    ml={3}
                                    bg="red.300"
                                    fontSize="xs"
                                    color="gray.900"
                                    fontWeight="bold"
                                    rounded="lg"
                                    textTransform="uppercase"
                                    _hover={{
                                        bg: "red.700",
                                        color: "gray.100"
                                    }}
                                    _focus={{
                                        bg: "gray.400",
                                    }}
                                    onClick={() => Decline()}
                                >
                                    decline
                                </chakra.button> : null
                        }
                        {/*<Button onClick={onClose}>Close</Button>*/}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};
