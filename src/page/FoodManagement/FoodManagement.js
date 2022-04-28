import {
  Button,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  useDisclosure,
  Box,
  Container,
} from "@chakra-ui/react";
import { ItemGrid } from "../../components/ItemGrid";
import { FoodItemModal } from "./FoodItemModal";
import { useMemo, useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import { useGetDocuments } from "../../hooks/useGetDocuments";
import { useUserContext } from "../../hooks/useUserContext";
import { Card } from "../../components/Card";
import { ListAccordion } from "../../components/ListAccordion";

export const FoodManagement = () => {
  const { id } = useUserContext();  
  const { docs, error } = useGetDocuments("Restaurants", id, "Food");
  const { docs: orders, error: orderError } = useGetDocuments("Orders", null, null, [
    "restaurantId",
    "==",
    id
  ]);
  console.log(orders)
  const styles = useMemo(
    () => ({
      width: "85%",
      maxWidth: "960px",
      margin: "0 auto",
    }),
    []
  );
  const [onFoodTab, setOnFoodTab] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const tabListTextColor = "gray.500";
  const yOffset = 5;

  // Optimise with useMemo
  return useMemo(() => {
    return (
      <div className="food-container" style={styles}>
        {error && <p>{error.message}</p>}

        <FoodItemModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
        <Tabs
          onChange={(i) => (i === 0 ? setOnFoodTab(true) : setOnFoodTab(false))}
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
            {onFoodTab ? (
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
              {docs && <ItemGrid data={docs} Card={Card} />}
            </TabPanel>
            <TabPanel p={0}>            
                {orders && <ListAccordion data={orders} />}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    );
  }, [docs, error, onOpen, onClose, isOpen, onFoodTab, styles]);
};
