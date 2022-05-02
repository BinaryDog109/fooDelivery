import { Heading, SkeletonText, Text } from "@chakra-ui/react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCRUD } from "../hooks/useCRUD";

const libraries = ["places"];
export const DisplayMap = ({ order = null, restaurant = null, orderId }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_THE_KEY,
    libraries,
  });
  const { updateDoc: updateOrder, response: orderResponse } = useCRUD("Orders");

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [duration, setDuration] = useState(null);
  const [distance, setDistance] = useState(null);
  const [direction, setDirection] = useState(null);
  const [direction2, setDirection2] = useState(null);
  const [orderCoordinates, setOrderCoordinates] = useState(null);
  const [restaurantCoordinates, setRestaurantCoordinates] = useState(null);
  const [currentPos, setCurrentPos] = useState(null);
  async function getCurrentPosition() {
    return new Promise(async (res, rej) => {
      const p = new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position),
          (error) => reject(error)
        );
      });
      const position = await p;
      const positionlat = position.coords.latitude;
      const positionlon = position.coords.longitude;
      const currentCoordinate = { lat: positionlat, lng: positionlon };
      res(currentCoordinate);
    });
  }
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
  const _setPositionsAndDirection = async (orderAdress, restaurantAddress) => {
    const currentCoordinate = await getCurrentPosition();
    setCurrentPos(currentCoordinate);
    // Fetch geo coordinates from post codes
    // eslint-disable-next-line no-undef
    const geocoder = new google.maps.Geocoder();
    const customerCoordinate = await getCoordinatesFromPostCode(
      geocoder,
      orderAdress
    );
    setOrderCoordinates(customerCoordinate);
    let restaurantCoordinate;
    // If you also provided restaurant postCode
    if (restaurantAddress) {
      restaurantCoordinate = await getCoordinatesFromPostCode(
        geocoder,
        restaurantAddress
      );
      setRestaurantCoordinates(restaurantCoordinate);
    }
    // Fetch direction
    // eslint-disable-next-line no-undef
    const service = new google.maps.DirectionsService();
    const currentPositionToCustomerPosition = await getDirection(
      service,
      currentCoordinate,
      customerCoordinate
    );
    setDirection(currentPositionToCustomerPosition);
    if (restaurantAddress) {
      const currentPositionToRestaurantPosition = await getDirection(
        service,
        currentCoordinate,
        restaurantCoordinate
      );
      setDirection2(currentPositionToRestaurantPosition);
    }
    return currentCoordinate;
  };
  // Cache this function. Otherwise it will exceed render limit.
  const setPositionsAndDirection = useRef(_setPositionsAndDirection).current;
  // Cache these two objects to avoid the same problem (tested).
  const cachedOrder = useRef(order).current;
  const cachedRestaurant = useRef(restaurant).current;

  //=========================================

  useEffect(() => {
    // this if statement was to prevent "google is not defined"
    if (map) {
      console.log("map to be refreshed!");
      const currentCoordinatePromise = setPositionsAndDirection(
        cachedOrder.postCode,
        cachedRestaurant.postCode
      );

      currentCoordinatePromise.then((currentCoordinate) => {
        updateOrder(orderId, {
          deliveryLocation: { ...currentCoordinate },
        });
      });
    }
  }, [
    map,
    cachedOrder,
    cachedRestaurant,
    setPositionsAndDirection,
    order.userWantsToUpdate,
    orderId,
    updateOrder,
  ]);

  if (!isLoaded) return <SkeletonText></SkeletonText>;
  return (
    <>
      {/* <Heading fontSize={"lg"}>
        {" "}
        {direction &&
          `Your food is just ${direction.routes[0].legs[0].distance.text} away!`}
      </Heading> */}
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        zoom={12}
        center={currentPos}
        // eslint-disable-next-line no-undef
        onLoad={(map) => {
          setMap(map);
        }}
      >
        {direction && <DirectionsRenderer directions={direction} />}
        {direction2 && <DirectionsRenderer directions={direction2} />}
        {currentPos && (
          <Marker
            position={currentPos}
          ></Marker>
        )}
        {/* {orderlatLng && <Marker position={orderlatLng}></Marker>}
        {restaurantLatLng && <Marker position={restaurantLatLng}></Marker>} */}
      </GoogleMap>
    </>
  );
};
