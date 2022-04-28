import { Link } from "react-router-dom";
import { BellIcon, SettingsIcon } from "@chakra-ui/icons";
import { Badge, Text } from "@chakra-ui/react";

import styles from "./Navbar.module.css";
import { Box } from "@chakra-ui/react";
import { MenuOpenButton } from "./MenuOpenButton";
import { useUserContext } from "../hooks/useUserContext";

export const Navbar = () => {
  let { orders, orderError } = useUserContext();
  const iconSize = 8;
  // TODO: Hamburger menu, useBreakpointValue
  // true = (0, base, sm) false = (sm, md) false = (md, upwards)
  // const isSmallScreen = useBreakpointValue({base: true, sm:false, md: false})
  // Filter out Paid Orders
  orders = orders && orders.filter((order) => order.status === "Paid");
  return (
    <Box
      pos={"relative"}
      zIndex={3}
      boxShadow={"5px 5px"}
      className={styles.header}
    >
      <div className={styles.logo}>
        {/* logo image */}
        <Text fontSize={["1.5rem", "2rem"]}>D3l1ver00 </Text>
        {/* <input type="text" /> */}
      </div>
      <nav className={styles.links}>
        <Link to={"/"}>
          {!orders || orders.length === 0 ? null : (
            <Badge
              ml="1"
              textAlign="center"
              w={4}
              h={4}
              borderRadius="50% 50%"
              colorScheme="red"
            >
              {orders.length}
            </Badge>
          )}
          <MenuOpenButton data={orders} Icon={BellIcon} />
        </Link>
        <Link to={"/"}>
          <MenuOpenButton Icon={SettingsIcon} />
        </Link>
        <div className="notification">{/* Icon */}</div>
      </nav>
    </Box>
  );
};
