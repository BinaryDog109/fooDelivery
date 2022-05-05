import { useMemo, useState } from "react";
import { OrderListAccordion } from "../../components/OrderListAccordion";
import { useGetDocuments } from "../../hooks/useGetDocuments";
import { useUserContext } from "../../hooks/useUserContext";
import { Box, Heading, ScaleFade } from "@chakra-ui/react";
import { ReturnButton } from "../../components/ReturnButton";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const ViewOrderCard = ({ basePath }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const { id } = useUserContext();
  const { docs: orders, error } = useGetDocuments(
    "Orders",
    null,
    null,
    ["uid", "==", id],
    ["createdAt", "desc"]
  );
  // console.log({id})
  // console.log({orders})
  const history = useHistory();
  return useMemo(() => {
    return (
      <>
        <ScaleFade in={true}>
          <Box textAlign={"left"}>
            <ReturnButton history={history} to={basePath} />
          </Box>

          <Heading
            fontSize={["2xl", "4xl"]}
            mb={2}
            bgGradient="linear(to-r, band1.100, band2.600)"
            bgClip="text"
          >
            My Orders
          </Heading>

          {orders && (
            <OrderListAccordion
              data={orders}
              activeOrder={tabIndex}
              setActiveOrder={setTabIndex}
              roles="customer"
            />
          )}
        </ScaleFade>
      </>
    );
  }, [orders, tabIndex, basePath, history]);
};
