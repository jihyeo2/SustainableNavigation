"use client";

import SearchTab from '../component/searchTab/searchTab'
import MapBoxMap from '../component/map/mapBoxMap'
import { DestinationCordiContext } from '../context/destinationCordiContext';
import { DirectionDataContext } from '../context/directionDataContext';
import { SourceCordiContext } from '../context/sourceCordiContext';
import { UserLocationContext } from '../context/userLocationContext';
import { ModeDataContext } from '../context/modeDataContext';
import { CarbonDataContext } from '../context/carbonDataContext';
import DistanceTime from "../component/searchTab/distanceTime";
import Link from 'next/link'

function LogoutBar() {
  return (
      <nav className="top-0 left-0 right-0 bg-transparent p-4 text-white flex justify-between">
        <a href="./"><h1 className="text-2xl font-semibold font-nunito">Sustainable Navigation</h1></a>
        <div className="flex space-x-4"> {/* Add a flex container for navigation links */}
          <Link href="/">
            <button onClick={() => localStorage.removeItem('jwtToken')} className="font-nunito bg-white hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-300 rounded">
              Log Out
            </button>
          </Link>
        </div>
      </nav>
  );
}

import { useEffect, useState } from 'react';
const Search: React.FC = (props:any) => {
  const [userLocation,setUserLocation]=useState<any>();
  const [sourceCoordinates,setSourceCordinates]=useState<any>([]);
  const [destinationCordinates,setDestinationCordinates]=useState<any>([]);
  const [directionData,setDirectionData]=useState<any>([]);
  const [modeData,setModeData]=useState<any>([]);
  const [carbonData,setCarbonData]=useState<any>([]);

  useEffect(()=>{
    getUserLocation();
  },[]);

  const getUserLocation=()=>{
    navigator.geolocation.getCurrentPosition(function(pos){
      setUserLocation({
        lat:pos.coords.latitude,
        lng:pos.coords.longitude
      });
    });
  };

  return (
    <div className='min-h-screen bg-slate-500'>
      <LogoutBar />
      <UserLocationContext.Provider value={{userLocation,setUserLocation}}>
      <SourceCordiContext.Provider value={{sourceCoordinates,setSourceCordinates}}>
      <DestinationCordiContext.Provider value={{destinationCordinates,setDestinationCordinates}}>
      <DirectionDataContext.Provider value={{directionData,setDirectionData}}>
      <ModeDataContext.Provider value={{modeData,setModeData}}>
      <CarbonDataContext.Provider value={{carbonData, setCarbonData}}>
     <div className='mt-16 grid grid-cols-1
     md:grid-cols-3'>
        <div className=''>
          <SearchTab/>
        </div>
        <div className='mt-10 col-span-2 '>
          <MapBoxMap/>
        </div>
     </div>
     <DistanceTime />
     </CarbonDataContext.Provider>
     </ModeDataContext.Provider>
     </DirectionDataContext.Provider>
     </DestinationCordiContext.Provider>
     </SourceCordiContext.Provider>
     </UserLocationContext.Provider>
    </div>
  );
};

export default Search;
