import { Container } from "@chakra-ui/react";
import { Navbar } from "../../components/Navbar";
import { useMemo } from "react";
import { LoginCard } from "./LoginCard";

export const LoginPage = () => {
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
      <Navbar />
      <Container p={2} style={styles} mt={5} borderRadius="md" boxShadow={"xl"}>
        <LoginCard />
      </Container>
    </>
  );
};
