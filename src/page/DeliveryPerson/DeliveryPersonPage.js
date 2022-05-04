import { Box, Button, Container } from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";

import { ItemGrid } from "../../components/ItemGrid";
import { Navbar } from "../../components/Navbar";
import { useGetDocuments } from "../../hooks/useGetDocuments";
import { useUserContext } from "../../hooks/useUserContext";
import { OrderCard } from "./OrderCard";
import { OrderTrackingCard } from "./OrderTrackingCard";

export const DeliveryPersonPage = ({ basePath }) => {
  const { response: deliveryUser } = useUserContext();
  const alreadyhasOrder =
    deliveryUser.document && deliveryUser.document.hasOrder;

  const styles = useMemo(
    () => ({
      width: "85%",
      maxWidth: "960px",
      marginLeft: "auto",
      marginRight: "auto",
      backgroundColor: "white",
    }),
    []
  );
  const { docs, error } = useGetDocuments("Orders", null, null, [
    "status",
    "==",
    "Paid",
  ]);
  return (
    <>
      {useMemo(
        () => (
          <Navbar></Navbar>
        ),
        []
      )}
      <Container p={2} style={styles} mt={5} borderRadius="md" boxShadow={"xl"}>
        {!alreadyhasOrder && docs && <ItemGrid data={docs} Card={OrderCard} />}

        {alreadyhasOrder && (
          <Switch>
            <Route exact path={basePath}>
              <Link to={basePath + "/track"}>
                <Button>Go to your active order</Button>
              </Link>
            </Route>
            <Route path={basePath + "/track"}>
              <OrderTrackingCard />
            </Route>
          </Switch>
        )}
      </Container>
    </>
  );
};
