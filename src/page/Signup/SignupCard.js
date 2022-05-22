/**
 * The Signin form design comes from https://chakra-templates.dev/forms/authentication
 */
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { ExtraCustomerForm } from "./ExtraCustomerForm";
import { ExtraManagerForm } from "./ExtraManagerForm";
import { useSignup } from "../../hooks/useSignup";

export const SignupCard = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signup, error, isPending } = useSignup()

  //   Controlled inputs state
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    password: "",
    email: "",
    roles: "customer",
  });
  const handleChange = (event) => {
    if (typeof event === "string") {
      setForm((prev) => ({
        firstname: prev.firstname,
        lastname: prev.lastname,
        password: prev.password,
        email: prev.email,
        roles: event,
      }));
      return;
    }
    setForm((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };
  const handleSubmit = event => {
    event.preventDefault()
    signup(form, form.roles)
  }
  // console.log({SignupError: error})
  return (
    <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
      <Stack align={"center"}>
        <Heading fontSize={"4xl"} textAlign={"center"} bgGradient="linear(to-r, band1.100, band2.600)"
            bgClip="text">
          Sign up
        </Heading>
        <Text fontSize={"lg"} color={"gray.600"}>
          Sign up to get the best food in the world ✌️
        </Text>
        <Text fontSize={"lg"} color={"gray.600"}>
          Have an account already? <Link color={"blue.300"} to={"/login"} as={RouterLink}>Sign in</Link>
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
            <HStack>
              <Box>
                <FormControl isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    id="firstname"
                    type="text"
                    value={form.firstname}
                    onChange={handleChange}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    id="lastname"
                    type="text"
                    value={form.lastname}
                    onChange={handleChange}
                  />
                </FormControl>
              </Box>
            </HStack>
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
              <InputGroup>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Text>I want to use this app as a...</Text>
            <RadioGroup onChange={handleChange} value={form.roles}>
              <Stack direction="row">
                <Radio value="customer">Customer</Radio>
                <Radio value="restaurant manager">Restaurant Manager</Radio>
                <Radio value="delivery">Driver</Radio>
              </Stack>
            </RadioGroup>
            {form.roles === "customer" ? (
              <ExtraCustomerForm form={form} handleChange={handleChange} />
            ) : form.roles === "restaurant manager" ? (
              <ExtraManagerForm form={form} handleChange={handleChange} />
            ) : null}
            <Stack spacing={10} pt={2}>
              <Button
              disabled={isPending}
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                type="submit"
              >
                Sign up
              </Button>
              {error && <Text>Error: {error}</Text>}
            </Stack>
          </form>
          <Stack pt={6}>
            <Text align={"center"}>
              Already a user? <Link as={RouterLink} to="/login" color={"blue.400"}>Login</Link>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};
