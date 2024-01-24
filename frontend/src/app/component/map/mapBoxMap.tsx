// References: https://github.com/rrs301/taxi-booking-nextjs

import { UserLocationContext } from "../../context/userLocationContext";
import { SourceCordiContext } from "../../context/sourceCordiContext";
import { DestinationCordiContext } from "../../context/destinationCordiContext";
import React, { useContext, useEffect, useRef } from 'react';
import Map from 'react-map-gl';
import Markers from "./markers";
import DistanceTime from "../searchTab/distanceTime";
import MapBoxRoute from "./mapBoxRoute";
import "mapbox-gl/dist/mapbox-gl.css";
import { DirectionDataContext } from "../../context/directionDataContext";
import { ModeDataContext } from "../../context/modeDataContext";

const MAPBOX_ENDPOINT =
  "https://api.mapbox.com/directions/v5/mapbox";

const MapBoxMap: React.FC = () => {
  const mapRef = useRef<any>();
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const { sourceCoordinates, setSourceCordinates } = useContext(SourceCordiContext);
  const { destinationCordinates, setDestinationCordinates } = useContext(DestinationCordiContext);
  const { directionData, setDirectionData } = useContext(DirectionDataContext);
  const { modeData, setModeData } = useContext(ModeDataContext);


  useEffect(() => {
    if (sourceCoordinates) {
      mapRef.current?.flyTo({
        center: [sourceCoordinates.lng, sourceCoordinates.lat],
        duration: 2500,
      });
    }
  }, [sourceCoordinates]);

  useEffect(() => {
    if (destinationCordinates) {
      mapRef.current?.flyTo({
        center: [destinationCordinates.lng, destinationCordinates.lat],
        duration: 2500,
      });
    }

    if (sourceCoordinates && destinationCordinates) {
      getDirectionRoute();
    }
  }, [destinationCordinates]);

  const getDirectionRoute = async () => {
    const walkingRes = await fetch(
      MAPBOX_ENDPOINT +
        "/walking/" +
        sourceCoordinates.lng +
        "," +
        sourceCoordinates.lat +
        ";" +
        destinationCordinates.lng +
        "," +
        destinationCordinates.lat +
        "?overview=full&geometries=geojson" +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const walkingResult = await walkingRes.json();

    const cyclingRes = await fetch(
      MAPBOX_ENDPOINT +
        "/cycling/" +
        sourceCoordinates.lng +
        "," +
        sourceCoordinates.lat +
        ";" +
        destinationCordinates.lng +
        "," +
        destinationCordinates.lat +
        "?overview=full&geometries=geojson" +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const cyclingResult = await cyclingRes.json();

    const drivingRes = await fetch(
      MAPBOX_ENDPOINT +
        "/driving/" +
        sourceCoordinates.lng +
        "," +
        sourceCoordinates.lat +
        ";" +
        destinationCordinates.lng +
        "," +
        destinationCordinates.lat +
        "?overview=full&geometries=geojson" +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const drivingResult = await drivingRes.json();
    setDirectionData([walkingResult, cyclingResult, drivingResult]);

    console.log(modeData);
  };


  return (
    <div className="">
        <div className="rounded-lg overflow-hidden">
            {userLocation ? (
                <Map
                ref={mapRef}
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                initialViewState={{
                    longitude: userLocation?.lng,
                    latitude: userLocation?.lat,
                    zoom: 14
                }}
                style={{width: "100%", height: 450, borderRadius: 10}}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                >
                    <Markers />
                    {/* <Marker
                    longitude={userLocation?.lng}
                    latitude={userLocation?.lat}
                    anchor="bottom"
                    >
                        <img src="./pin.png"
                        className="w-10 h-10"/>
                    </Marker> */}
                    {(directionData[0] && directionData[0]?.routes && (modeData.length == 0 || modeData == 1)) ? (
              <MapBoxRoute
                color="#D47604"
                coordinates={directionData[0]?.routes[0]?.geometry?.coordinates}
              />
            ) : null}
                    {(directionData[1] && directionData[1]?.routes && (modeData.length == 0 || modeData == 2)) ? (
              <MapBoxRoute
                color="#04C9D4"
                coordinates={directionData[1]?.routes[0]?.geometry?.coordinates}
              />
            ) : null}
                    {(directionData[2] && directionData[2]?.routes && (modeData.length == 0 || modeData == 3)) ? (
              <MapBoxRoute
                color="#0462d4"
                coordinates={directionData[2]?.routes[0]?.geometry?.coordinates}
              />
            ) : null}
                </Map>
            ): null}
        </div>
    </div>
  );
};

export default MapBoxMap;