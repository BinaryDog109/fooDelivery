import { Link } from "react-router-dom";
import { BellIcon, SettingsIcon } from "@chakra-ui/icons";
import { Text, useBreakpointValue } from '@chakra-ui/react'

import styles from "./Navbar.module.css";
import { Box } from "@chakra-ui/react";
import { MenuOpenButton } from "./MenuOpenButton";

export const Navbar = () => {
  const iconSize = 8;
  // TODO: Hamburger menu, useBreakpointValue
  // true = (0, base, sm) false = (sm, md) false = (md, upwards)
  // const isSmallScreen = useBreakpointValue({base: true, sm:false, md: false})
  return (
    <Box boxShadow={"5px 5px"} className={styles.header}>
      <div className={styles.logo}>
        {/* logo image */}
        <Text fontSize={["1.5rem", "2rem"]}>D3l1ver00 </Text>
        {/* <input type="text" /> */}
      </div>
      <nav className={styles.links}>
        <Link to={"/"}>
          <MenuOpenButton Icon={BellIcon} />
          
        </Link>
        <Link to={"/"}>
        <MenuOpenButton Icon={SettingsIcon} />
        </Link>
        <div className="notification">{/* Icon */}</div>
      </nav>
    </Box>
  );
};
