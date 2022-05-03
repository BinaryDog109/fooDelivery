import {chakra, Box, Center, Divider, Image, Text, Link, useDisclosure,} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { HiOutlineLocationMarker, HiOutlineClock } from "react-icons/hi";
import {RestaurantItemModal} from "./RestaurantItemModal";
import { useRestaurant } from "../../hooks/useRetaurant";
import { getDatabase, ref, onValue} from "firebase/database";
import firebase from "firebase/compat/app";
import {projectFirestore} from "../../firebase/config";
export const RestaurantListDetail = ({data, status}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    // const {restaurantInfo} = useRestaurant(data.id)

    const Approve = async () => {
        const starCountRef = projectFirestore.collection('Restaurants').doc(data.id)
        const res = await starCountRef.update({
            status: "accepted",
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
    }
    const Decline = async () => {
        const starCountRef = projectFirestore.collection('Restaurants').doc(data.id)
        const res = await starCountRef.update({
            status: "declined",
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
    }

    return (

        <>
            <RestaurantItemModal data={data} status={status} isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
            <Box p={8} display={{ md: "flex" }}>
                <Box flexShrink={0}>
                    <Image
                        borderRadius="lg"
                        width={{ md: 40 }}
                        src={"https://bit.ly/2jYM25F"}
                        alt="restaurant image"
                    />
                </Box>
                <Box textAlign={"left"} mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
                    <Text
                        fontWeight="bold"
                        textTransform="uppercase"
                        fontSize="sm"
                        letterSpacing="wide"
                        color="teal.600"
                    >
                        Marketing
                    </Text>
                    <Text
                        mt={1}
                        display="block"
                        fontSize="lg"
                        lineHeight="normal"
                        fontWeight="semibold"
                        href="#"
                    >
                        {data.name || "Unknown name"}
                    </Text>
                    <Link onClick={onOpen}>
                    <Text noOfLines={3} mt={2} color="gray.500">
                        {data.description}
                    </Text>
                    </Link>
                </Box>
                <Box
                    flexShrink={0}
                    ml="auto"
                    textAlign="left"
                    display={"flex"}
                    flexDir="column"
                    justifyContent={"center"}
                    className="misc info"
                >

                    <Text>
                        <Icon mr={1} as={HiOutlineLocationMarker}></Icon>
                        <span>SO16 3UF</span>
                    </Text>
                    <Text>
                        <Icon mr={1} as={HiOutlineClock} />
                        <span>12:00~2:00</span>
                    </Text>
                    {
                        status!==1?
                        <chakra.button
                        px={3}
                        py={4}
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
                        </chakra.button>:null
                    }
                    {
                        status!==2?
                        <chakra.button
                            px={3}
                            py={4}
                            mt={2}
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
                        </chakra.button>:null
                    }
                </Box>

            </Box>
            <Center>
                <Divider w={"80%"} orientation="horizontal" />
            </Center>
        </>
    );
};
