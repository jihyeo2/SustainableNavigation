import React from 'react'
import { Layer, Source } from "react-map-gl";

interface MapBoxRouteProps {
  color: string;
  coordinates: any;
}

const MapBoxRoute: React.FC<MapBoxRouteProps> = ({ color, coordinates }) => {

  return (
    <Source 
    type="geojson" 
    data={{ 
        type: 'Feature', 
        geometry: 
        { type: 'LineString', coordinates: coordinates },
        properties: {
            "name": "User Input"
          }
    }}
    >
        <Layer
          type="line"
          layout={{ 'line-join': 'round', 'line-cap': 'square' }}
          paint={{ 'line-color': color, 'line-width': 4 }}
        />
      </Source>
  );
};

export default MapBoxRoute;