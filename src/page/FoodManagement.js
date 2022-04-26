import { Button, Tabs, Tab, TabList, TabPanel, TabPanels } from "@chakra-ui/react";
import { ItemGrid } from "../components/ItemGrid";
import { FoodItemModal } from "./FoodItemModal";
import { useState } from "react";

export const FoodManagement = () => {
  const styles = {
    width: "85%",
    maxWidth: "960px",
    margin: "0 auto",
  };
  const [onFoodTab, setOnFoodTab] = useState(true)
  const tabListTextColor = "grey.500";
  const yOffset = 5;
  
  return (
    <div className="food-container" style={styles}>
      <Tabs onChange={i=>i===0? setOnFoodTab(true) : setOnFoodTab(false)} variant="soft-rounded" colorScheme="yellow">
        <TabList mt={yOffset} alignItems="center">
          
          <Tab color={tabListTextColor}>Food Items</Tab>
          <Tab color={tabListTextColor}>Orders</Tab>
          {onFoodTab? <FoodItemModal/> : null}
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
