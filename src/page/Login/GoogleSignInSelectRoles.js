import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  AlertDialogCloseButton,
  RadioGroup,
  Stack,
  Radio,
  Text,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useGoogleSignIn } from "../../hooks/useGoogleSignIn";
import { ExtraCustomerForm } from "../Signup/ExtraCustomerForm";
import { ExtraManagerForm } from "../Signup/ExtraManagerForm";
export const GoogleSignInSelectRoles = ({ onOpen, onClose, isOpen }) => {
  const { signup, error, isPending } = useGoogleSignIn();
  const [form, setForm] = useState({
    roles: "customer",
  });
  const cancelRef = useRef();
  const handleChange = (event) => {
    if (typeof event === "string") {
      setForm((prev) => ({
        roles: event,
      }));
      return;
    }
    setForm((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    signup(form, form.roles);
  };
  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Sign in with Google</AlertDialogHeader>
          <AlertDialogCloseButton />
          <Button onClick={handleSubmit}>Click if already a registered user</Button>
          <form onSubmit={handleSubmit} id="google-signin">
            <AlertDialogBody>
              {error && <Text>{error}</Text>}
              Please select a role if you are a new user:
              <RadioGroup my={2} onChange={handleChange} value={form.roles}>
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
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                colorScheme="blue"
                ml={3}
                name="yty"
                form="google-signin"
              >
                Sign in
              </Button>
            </AlertDialogFooter>{" "}
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
