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
import { useState } from "react";
import { AddIcon } from "@chakra-ui/icons";

export const FoodManagement = () => {
  const styles = {
    width: "85%",
    maxWidth: "960px",
    margin: "0 auto",
  };
  const [onFoodTab, setOnFoodTab] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const tabListTextColor = "grey.500";
  const yOffset = 5;

  return (
    <div className="food-container" style={styles}>
      <FoodItemModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
      <Tabs
        onChange={(i) => (i === 0 ? setOnFoodTab(true) : setOnFoodTab(false))}
        variant="soft-rounded"
        colorScheme="yellow"
      >
        <TabList
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
        <TabPanels mb={yOffset}>
          <TabPanel p={0}>
            <ItemGrid cardNum={5} />
          </TabPanel>
          <TabPanel p={0}>
            <ItemGrid />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};
