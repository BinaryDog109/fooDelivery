import { Heading, SkeletonText, Text } from "@chakra-ui/react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useEffect, useMemo, useRef, useState } from "react";

const libraries = ["places"];
export const DisplayMap = ({ order = null, restaurant = null }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_THE_KEY,
    libraries,
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [duration, setDuration] = useState(null);
  const [distance, setDistance] = useState(null);
  const [direction, setDirection] = useState(null);
  const [direction2, setDirection2] = useState(null);
  const [orderlatLng, setOrderLatLng] = useState(null);
  const [restaurantLatLng, setRestaurantLatLng] = useState(null);
  const [currentPos, setCurrentPos] = useState(null);
  function getCurrentPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error)
      );
    });
  }
  const _setPositionsAndDirection = async (orderAdress, restaurantAddress) => {
    const position = await getCurrentPosition();
    const positionlat = position.coords.latitude;
    const positionlon = position.coords.longitude;
    const currentCoordinate = { lat: positionlat, lng: positionlon };
    setCurrentPos(currentCoordinate);
    // Fetch geo coordinates from post codes
    // eslint-disable-next-line no-undef
    const geocoder = new google.maps.Geocoder();
    const { results } = await geocoder.geocode({ address: orderAdress });
    const { lat, lng } = results[0].geometry.location;
    const latitute = lat();
    const longtitute = lng();
    const customerCoordinate = { lat: latitute, lng: longtitute };
    setOrderLatLng(customerCoordinate);
    let restaurantCoordinate;
    // If you also provided restaurant postCode
    if (restaurantAddress) {
      const { results } = await geocoder.geocode({
        address: restaurantAddress,
      });
      const { lat, lng } = results[0].geometry.location;
      const latitute = lat();
      const longtitute = lng();
      restaurantCoordinate = { lat: latitute, lng: longtitute };
      setRestaurantLatLng(restaurantCoordinate);
    }
    // Fetch direction
    // eslint-disable-next-line no-undef
    const service = new google.maps.DirectionsService();
    const directionResults = await service.route({
      origin: currentCoordinate,
      destination: customerCoordinate,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.BICYCLING,
    });
    setDirection(directionResults);
    if (restaurant) {
      const resDirectionResults = await service.route({
        origin: currentCoordinate,
        destination: restaurantCoordinate,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.BICYCLING,
      });
      setDirection2(resDirectionResults);
    }
  };
  const setPositionsAndDirection = useRef(_setPositionsAndDirection).current;
  //=========================================

  useEffect(() => {
    if (map) {
      setPositionsAndDirection(order.postCode, restaurant.postCode);
    }
  }, [map, order, restaurant, setPositionsAndDirection]);

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
        {/* {currentPos && <Marker position={currentPos}></Marker>}
        {orderlatLng && <Marker position={orderlatLng}></Marker>}
        {restaurantLatLng && <Marker position={restaurantLatLng}></Marker>} */}
      </GoogleMap>
    </>
  );
};
