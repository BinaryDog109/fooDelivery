import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Center,
  useDisclosure,
} from "@chakra-ui/react";
import { FcGoogle } from 'react-icons/fc';
import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { GoogleSignInSelectRoles } from "./GoogleSignInSelectRoles";
export const LoginCard = () => {
  // Used by google login
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { login, isPending, error } = useLogin();
  //   Controlled inputs state
  const [form, setForm] = useState({
    password: "",
    email: "",
  });
  const handleChange = (event) => {
    setForm((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    login(form.email, form.password);
  };
  return (
    <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
      <Stack align={"center"}>
        <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        <Text fontSize={"lg"} color={"gray.600"}>
          What do you want to eat today? 🤤
        </Text>
      </Stack>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
      >
        <Stack spacing={4}>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                id="password"
                value={form.password}
                onChange={handleChange}
              />
            </FormControl>
            <Stack spacing={5}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                {/* <Link color={"blue.400"}>Forgot password?</Link> */}
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                disabled={isPending}
                type="submit"
              >
                Log in
              </Button>
              <Button onClick={onOpen} w={"full"} variant={"outline"} leftIcon={<FcGoogle />}>
                <Center>
                  <Text>Sign in with Google</Text>
                </Center>
              </Button>
              <GoogleSignInSelectRoles onClose={onClose} onOpen={onOpen} isOpen={isOpen} />
              {error && <Text>Error: {error}</Text>}
            </Stack>
          </form>
        </Stack>
      </Box>
    </Stack>
  );
};
