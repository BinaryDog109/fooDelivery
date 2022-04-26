import { Card } from "../components/Card";
import { Tabs, Tab, TabList, TabPanel,TabPanels } from "@chakra-ui/react";
import { ItemGrid } from "../components/ItemGrid";
export const FoodManagement = () => {
  const styles = {
    width: "85%",
    maxWidth: "960px",
    margin: "0 auto",
  };
  const tabListTextColor = "grey.500"
  const yOffset = 5
  return (
    <div className="food-container" style={styles}>
      <Tabs variant="soft-rounded" colorScheme="yellow">
        <TabList mt={yOffset}>
          <Tab color={tabListTextColor}>Food Items</Tab>
          <Tab color={tabListTextColor}>Orders</Tab>
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
