import { Badge, Box, Heading, SkeletonText, Text } from "@chakra-ui/react";
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
  Marker,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";

const libraries = ["places"];
export const CustomerDisplayMap = ({
  deliveryLat,
  deliveryLng,
  customerPostCode,
}) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_THE_KEY,
    libraries,
  });
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [direction, setDirection] = useState(null);
  const [customerPos, setCustomerPos] = useState(null);
  const [deliveryPos, setDeliveryPos] = useState(null)
  const getCoordinatesFromPostCode = (geocoder, postCode) => {
    return new Promise(async (res, rej) => {
      const { results } = await geocoder.geocode({ address: postCode });
      const { lat, lng } = results[0].geometry.location;
      const latitute = lat();
      const longtitute = lng();
      const coordinate = { lat: latitute, lng: longtitute };
      res(coordinate);
    });
  };
  const getDirection = (service, origin, destination) => {
    return new Promise(async (res, rej) => {
      const directionResults = await service.route({
        origin,
        destination,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.BICYCLING,
      });
      res(directionResults);
    });
  };
  const _setPositionsAndDirection = async () => {
    // eslint-disable-next-line no-undef
    const geocoder = new google.maps.Geocoder();
    // eslint-disable-next-line no-undef
    const service = new google.maps.DirectionsService();
    const customerCoords = await getCoordinatesFromPostCode(
      geocoder,
      customerPostCode
    );
    setCustomerPos(customerCoords);
    const deliveryCoords = { lat: deliveryLat, lng: deliveryLng };
    setDeliveryPos(deliveryCoords)
    const direction = await getDirection(
      service,
      customerCoords,
      deliveryCoords
    );
    setDirection(direction);
  };
  // Cache this function. Otherwise it will exceed render limit.
  const setPositionsAndDirection = useRef(_setPositionsAndDirection).current;
  useEffect(() => {
    if (map) {
      console.log("customer map to be refreshed");
      setPositionsAndDirection();
    }
  }, [map, setPositionsAndDirection, deliveryLat, deliveryLng]);

  if (!isLoaded) return <SkeletonText></SkeletonText>;
  return (
    <>
      {direction && (
        <Box textAlign={"left"}>
          <Heading fontSize={"lg"}>
            {`Your food is`}{" "}
            <Badge
              fontSize={"lg"}
              colorScheme="green"
            >{`${direction.routes[0].legs[0].distance.text}`}</Badge>{" "}
            {`away!`}
          </Heading>
          <Heading>
            Estimated Time:{" "}
            <Badge
              fontSize={"lg"}
              colorScheme="red"
            >{`${direction.routes[0].legs[0].duration.text}`}</Badge>
          </Heading>
        </Box>
      )}
      <Box height={500}>
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          zoom={12}
          center={customerPos}
          // eslint-disable-next-line no-undef
          onLoad={(map) => {
            setMap(map);
          }}
        >
          {direction && <DirectionsRenderer directions={direction} />}
          <Marker position={deliveryPos} />
          <Marker position={customerPos} />
        </GoogleMap>
      </Box>
    </>
  );
};
