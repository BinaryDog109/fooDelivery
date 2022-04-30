import {
  Box,
  Center,
  Container,
  Divider,
  Image,
  List,
  ListItem,
  ScaleFade,
  Text,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { HiOutlineLocationMarker, HiOutlineClock } from "react-icons/hi";
import { useMemo } from "react";
import { Navbar } from "../../components/Navbar";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { RestaurantCard } from "./RestaurantCard";
import { CartPopup } from "./CartPopup";
import { useUserContext } from "../../hooks/useUserContext";

export const CustomerPage = ({ basePath = "/" }) => {
  
  const styles = useMemo(
    () => ({
      width: "85%",
      maxWidth: "960px",
      marginLeft: "auto",
      marginRight: "auto",
      backgroundColor: "white",
    }),
    []
  );
  return (
    <>
      <Navbar>
        <CartPopup/>
      </Navbar>
      <Container style={styles} mt={5} borderRadius="md" boxShadow={"xl"}>
        <Route exact path={"/cus"}>
          <ScaleFade in={true}>
            <List>
              <Link to={basePath + "/adwdwd"}>
                <ListItem className="restaurant-item" listStyleType={"none"}>
                  <Box p={4} display={{ md: "flex" }}>
                    <Box flexShrink={0}>
                      <Image
                        borderRadius="lg"
                        width={{ md: 40 }}
                        src="https://bit.ly/2jYM25F"
                        alt="Woman paying for a purchase"
                      />
                    </Box>
                    <Box
                      textAlign={"left"}
                      mt={{ base: 4, md: 0 }}
                      ml={{ md: 6 }}
                    >
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
                        Finding customers for your new business
                      </Text>
                      <Text mt={2} color="gray.500">
                        Getting a new business off the ground is a lot of hard
                        work. Here are five ideas you can use to find your first
                        customers.
                      </Text>
                    </Box>
                    <Box
                      flexShrink={0}
                      textAlign="left"
                      display={"flex"}
                      flexDir="column"
                      justifyContent={"center"}
                    >
                      <Text>
                        <Icon mr={1} as={HiOutlineLocationMarker}></Icon>
                        <span>SO16 3UF</span>
                      </Text>
                      <Text>
                        <Icon mr={1} as={HiOutlineClock} />
                        <span>12:00~2:00</span>
                      </Text>
                    </Box>
                  </Box>
                  <Center>
                    <Divider w={"80%"} orientation="horizontal" />
                  </Center>
                </ListItem>
              </Link>
              <ListItem listStyleType={"none"}>
                <Box p={4} display={{ md: "flex" }}>
                  <Box flexShrink={0}>
                    <Image
                      borderRadius="lg"
                      width={{ md: 40 }}
                      src="https://bit.ly/2jYM25F"
                      alt="Woman paying for a purchase"
                    />
                  </Box>
                  <Box
                    textAlign={"left"}
                    mt={{ base: 4, md: 0 }}
                    ml={{ md: 6 }}
                  >
                    <Text
                      fontWeight="bold"
                      textTransform="uppercase"
                      fontSize="sm"
                      letterSpacing="wide"
                      color="teal.600"
                    >
                      5 sales
                    </Text>
                    <Text
                      mt={1}
                      display="block"
                      fontSize="lg"
                      lineHeight="normal"
                      fontWeight="semibold"
                      href="#"
                    >
                      Finding customers for your new business
                    </Text>
                    <Text mt={2} color="gray.500">
                      Getting a new business off the ground is a lot of hard
                      work. Here are five ideas you can use to find your first
                      customers.
                    </Text>
                  </Box>
                </Box>
                <Center>
                  <Divider w={"80%"} orientation="horizontal" />
                </Center>
              </ListItem>
            </List>
          </ScaleFade>
        </Route>
        <Route path={basePath + "/:id"}>
          <RestaurantCard></RestaurantCard>
        </Route>
      </Container>
    </>
  );
};
