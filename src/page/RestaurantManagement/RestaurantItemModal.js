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
// Wraps a HighModal and inserts a FoodItemForm
export const RestaurantItemModal = ({ data, isOpen, onClose, onOpen }) => {
    const [scrollBehavior, setScrollBehavior] = React.useState('inside')

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
                        alt="Woman paying for a purchase"
                    />
                    </Center>
                    <ModalCloseButton />
                    <ModalBody>
                        {data.description}
                    </ModalBody>
                    <ModalFooter>
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
                        >
                            Approve
                        </chakra.button>
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
                        >
                            decline
                        </chakra.button>
                        {/*<Button onClick={onClose}>Close</Button>*/}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};
