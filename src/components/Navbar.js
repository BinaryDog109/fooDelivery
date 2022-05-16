import { Link } from "react-router-dom";
import { Button, Image, Text } from "@chakra-ui/react";

import styles from "./Navbar.module.css";
import { Box } from "@chakra-ui/react";
import { SettingsButton } from "./SettingsButton";
import { useAuthContext } from "../hooks/useAuthContext";

export const Navbar = ({ children }) => {
  // TODO: Hamburger menu, useBreakpointValue
  // true = (0, base, sm) false = (sm, md) false = (md, upwards)
  // const isSmallScreen = useBreakpointValue({base: true, sm:false, md: false})
  // Filter out Paid Orders
  const { user } = useAuthContext();
  return (
    <Box
      pos={"relative"}
      zIndex={3}
      boxShadow={"5px 5px"}
      className={styles.header}
    >
      <div className={styles.logo}>
        <Link to={"/"}>
          <Image w={170} src="/img/logo.svg" />
        </Link>
      </div>
      <nav className={styles.links}>
        {user && (
          <>
            <Text>Welcome, {user.displayName}</Text>
            {/* Add more content in the nav if any */}
            {children}
            <Box ml={2}>
              <SettingsButton />
            </Box>
          </>
        )}
        {!user && (
          <>
            <Link to={"/login"}>
              <Button>Login</Button>
            </Link>
            <Link to={"/reg"}>
              <Button>Sign up</Button>
            </Link>
          </>
        )}
      </nav>
    </Box>
  );
};
