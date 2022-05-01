import { SkeletonText } from "@chakra-ui/react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";

const libraries = ["places"];
export const DisplayMap = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_THE_KEY,
    libraries,
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [duration, setDuration] = useState(null);
  const [distance, setDistance] = useState(null);
  const [direction, setDirection] = useState(null);
  const [latLng, setLatLng] = useState(null);

  //   Todo: replace this with order address
  const [currentPos, setCurrentPos] = useState(null);
  const setPositionsAndDirection = async (address) => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const userPos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      setCurrentPos(userPos);
      // Fetch geo
      // eslint-disable-next-line no-undef
      const geocoder = new google.maps.Geocoder();
      const { results } = await geocoder.geocode({ address });
      const { lat, lng } = results[0].geometry.location;
      const latitute = lat();
      const longtitute = lng();
      const deliveryPos = { lat: latitute, lng: longtitute };
      setLatLng(deliveryPos);
      // Fetch direction
      // eslint-disable-next-line no-undef
      const service = new google.maps.DirectionsService();
      const directionResults = await service.route({
        origin: userPos,
        destination: deliveryPos,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.BICYCLING,
      });
      setDirection(directionResults);
      console.log(directionResults);
    });
  };
  //=========================================

  useEffect(() => {
    if (map) {
      setPositionsAndDirection("SO14 7DX");
    }
  }, [map]);

  if (!isLoaded) return <SkeletonText></SkeletonText>;
  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      zoom={12}
      center={currentPos}
      // eslint-disable-next-line no-undef
      onLoad={async (map) => {
        setMap(map);
      }}
    >
      <Marker position={currentPos} />
      <Marker position={latLng} />
      {direction && <DirectionsRenderer directions={direction} />}
    </GoogleMap>
  );
};
