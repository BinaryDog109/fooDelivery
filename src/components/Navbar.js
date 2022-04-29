import { Link } from "react-router-dom";
import { SettingsIcon } from "@chakra-ui/icons";
import { Text } from "@chakra-ui/react";

import styles from "./Navbar.module.css";
import { Box } from "@chakra-ui/react";
import { MenuOpenButton } from "./MenuOpenButton";

export const Navbar = ({  children }) => {
  // TODO: Hamburger menu, useBreakpointValue
  // true = (0, base, sm) false = (sm, md) false = (md, upwards)
  // const isSmallScreen = useBreakpointValue({base: true, sm:false, md: false})
  // Filter out Paid Orders
  
  return (
    <Box
      pos={"relative"}
      zIndex={3}
      boxShadow={"5px 5px"}
      className={styles.header}
    >
      <div className={styles.logo}>
        {/* logo image */}
        <Text fontSize={["1.5rem", "2rem"]} bgGradient='linear(to-r, band1.100, band2.600)'
  bgClip='text'>D3l1ver00 </Text>
        {/* search bar */}
      </div>
      <nav className={styles.links}>
        {/* Add more content in the nav if any */}
        {children}
        <MenuOpenButton Icon={SettingsIcon} />
      </nav>
    </Box>
  );
};
