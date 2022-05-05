import {
  Button,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  useDisclosure,
} from "@chakra-ui/react";
import { ItemGrid } from "../../components/ItemGrid";
import { FoodItemModal } from "./FoodItemModal";
import { useMemo } from "react";
import { AddIcon } from "@chakra-ui/icons";
import { useGetDocuments } from "../../hooks/useGetDocuments";
import { useRestaurantOrderContext } from "../../hooks/useRestaurantOrderContext";
import { FoodCard } from "./FoodCard";
import { OrderListAccordion } from "../../components/OrderListAccordion";

export const FoodManagement = ({
  tabIndex,
  setTabIndex,
  activeOrder,
  setActiveOrder,
}) => {
  const { id, orders, error: orderError } = useRestaurantOrderContext();
  const { docs, error } = useGetDocuments("Restaurants", id, "Food");
  const styles = useMemo(
    () => ({
      width: "85%",
      maxWidth: "960px",
      margin: "0 auto",
    }),
    []
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  const tabListTextColor = "gray.500";
  const yOffset = 5;

  // Optimise with useMemo
  return useMemo(() => {
    return (
      <div className="food-container" style={styles}>
        {error && <p>{error}</p>}
        {orderError && <p>{orderError}</p>}

        <FoodItemModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
        <Tabs
          index={tabIndex}
          onChange={setTabIndex}
          variant="soft-rounded"
          colorScheme="yellow"
        >
          <TabList
            zIndex={2}
            boxShadow={"dark-lg"}
            borderRadius={"sm"}
            p={2}
            bg={"white"}
            pos={"sticky"}
            top={0}
            mt={yOffset}
            alignItems="center"
          >
            <Tab color={tabListTextColor}>Food Items</Tab>
            <Tab color={tabListTextColor}>Orders</Tab>
            {tabIndex === 0 ? (
              <Button
                ml={"auto"}
                leftIcon={<AddIcon />}
                colorScheme="yellow"
                variant="solid"
                onClick={onOpen}
              >
                Add
              </Button>
            ) : null}
          </TabList>
          <TabPanels pt={5} mb={yOffset}>
            <TabPanel p={0}>
              {docs && <ItemGrid data={docs} Card={FoodCard} />}
            </TabPanel>
            <TabPanel p={0}>
              {orders && (
                <OrderListAccordion
                  data={orders}
                  activeOrder={activeOrder}
                  setActiveOrder={setActiveOrder}
                />
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    );
  }, [
    docs,
    error,
    onOpen,
    onClose,
    isOpen,
    styles,
    orders,
    orderError,
    tabIndex,
    setTabIndex,
    activeOrder,
    setActiveOrder,
  ]);
};
