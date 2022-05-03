import { Container } from "@chakra-ui/react";
import { useMemo } from "react";
import { Navbar } from "../../components/Navbar";
import { SignupCard } from "./SignupCard";

export const SignupPage = () => {
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
      <Navbar></Navbar>
      <Container
        p={2}
        style={styles}
        mt={5}
        borderRadius="md"
        boxShadow={"xl"}
      >
        <SignupCard />
      </Container>
    </>
  );
};
