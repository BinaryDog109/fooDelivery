import React from "react";
import {
  chakra,
  Box,
  Flex,
  Heading,
  Button,
  Stack,
} from "@chakra-ui/react";
import { MyThemeButton } from "../../components/MyThemeButton";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export function HomePage(){
    const history = useHistory()
  return (
    <chakra.header>
      
      <Box
        w="full"
        h="100vh"
        backgroundImage="url(/img/homepage-unsplash.jpg)"
        bgPos="center"
        bgSize="cover"
      >
        <Flex
          align="center"
          pos="relative"
          justify="center"
          boxSize="full"
          bg="blackAlpha.700"
        >
          <Stack textAlign="center" alignItems="center" spacing={6}>
            <Heading
              fontSize={["2xl", "3xl"]}
              fontWeight="semibold"
              color="white"
              textTransform="uppercase"
            >
              Get your foo-
              <chakra.span bgGradient="linear(to-r, band1.100, band2.600)"
            bgClip="text" textDecor="underline">
                delivered
              </chakra.span>
            </Heading>
            <MyThemeButton onClick={()=>history.push("/reg")} p={8}>Sign up</MyThemeButton>
          </Stack>
        </Flex>
      </Box>
    </chakra.header>
  );
};

