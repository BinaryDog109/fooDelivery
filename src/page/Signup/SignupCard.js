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
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { ExtraCustomerForm } from "./ExtraCustomerForm";
import { ExtraManagerForm } from "./ExtraManagerForm";

export const SignupCard = () => {
  const [showPassword, setShowPassword] = useState(false);
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
  return (
    <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
      <Stack align={"center"}>
        <Heading fontSize={"4xl"} textAlign={"center"}>
          Sign up
        </Heading>
        <Text fontSize={"lg"} color={"gray.600"}>
          Sign up to get the best food in the world ✌️
        </Text>
      </Stack>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
      >
        <Stack spacing={4}>
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
          <Text>Which role are you?</Text>
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
              loadingText="Submitting"
              size="lg"
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
            >
              Sign up
            </Button>
          </Stack>
          <Stack pt={6}>
            <Text align={"center"}>
              Already a user? <Link color={"blue.400"}>Login</Link>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};
