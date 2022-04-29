import { BellIcon } from "@chakra-ui/icons";
import { Badge, Box } from "@chakra-ui/react";
import { MenuOpenButton } from "../../components/MenuOpenButton";
import { useUserContext } from "../../hooks/useUserContext";

export const FoodManagementBell = ({
  setActiveOrder,
  setTabIndex
}) => {
  let { orders, orderError } = useUserContext();
  orders = orders && orders.filter((order) => order.status === "Paid");
  const handleBellMenuItemSelected = (elemId) => {
    setTabIndex(1);
    setActiveOrder(elemId);
    window.location.href = `#${elemId}`;
  };

  return ( !orderError &&
    <Box className="bell-button" pos={"relative"}>
      
      <MenuOpenButton
        handleSelect={handleBellMenuItemSelected}
        data={orders}
        Icon={BellIcon}
      />
      {!orders || orders.length === 0 ? null : (
        <Badge
          // ml="1"
          textAlign="center"
          w={4}
          h={4}
          borderRadius="50% 50%"
          colorScheme="red"
          pos={"absolute"}
          left={0}
          
        >
          {orders.length}
        </Badge>
      )}
    </Box>
  );
};
