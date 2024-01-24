// References: https://github.com/rrs301/taxi-booking-nextjs

import { DestinationCordiContext } from '../../context/destinationCordiContext'
import { SourceCordiContext } from '../../context/sourceCordiContext'
import React, { useContext, useEffect, useState } from 'react'

const session_token='5ccce4a4-ab0a-4a7c-943d-580e55542363'
const MAPBOX_RETRIVE_URL='https://api.mapbox.com/search/searchbox/v1/retrieve/'
const AutocompleteAddress: React.FC = () => {
    const [source,setSource]=useState<any>();
    const [sourceChange,setSourceChange]=useState<any>(false);
    const [destinationChange,setDestinationChange]=useState<any>(false);

    const {sourceCoordinates,setSourceCordinates}=useContext(SourceCordiContext);
    const {destinationCordinates,setDestinationCordinates}
    =useContext(DestinationCordiContext);

    const [addressList,setAddressList]=useState<any>([]);
    const [destination,setDestination]=useState<any>();

    useEffect(()=>{
        const delayDebounceFn=  setTimeout(()=>{
            getAddressList()
        },1000)
        return () => clearTimeout(delayDebounceFn)
    },[source,destination]);


    const getAddressList=async()=>{
        setAddressList([]);
        const query=sourceChange?source:destination;
        const res=await fetch('/api/search-address?q='+query,{
            headers:{
                "Content-Type": "application/json",
        }
        });

        const result=await res.json();
        setAddressList(result)

    };

    const onSourceAddressClick=async(item:any)=>{
        setSource(item.full_address);
        setAddressList([]);setSourceChange(false)
        const res=await fetch(MAPBOX_RETRIVE_URL+item.mapbox_id
            +"?session_token="+session_token
            +"&access_token="+process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN)

        const result=await res.json();

        setSourceCordinates({
            lng:result.features[0].geometry.coordinates[0],
            lat:result.features[0].geometry.coordinates[1],
        })
        console.log(result);
    };

    const onDestinationAddressClick=async(item:any)=>{
        setDestination(item.full_address);
        setAddressList([]);
        setDestinationChange(false)
        const res=await fetch(MAPBOX_RETRIVE_URL+item.mapbox_id
            +"?session_token="+session_token
            +"&access_token="+process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN)

        const result=await res.json();

        setDestinationCordinates({
            lng:result.features[0].geometry.coordinates[0],
            lat:result.features[0].geometry.coordinates[1],
        })
        console.log(result);
    };

  return (
    <div className=''>
        <div className='relative'>
            <label className='text-black dark:text-white text-[13px]'>Starting Address</label>
            <input type="text"
                className='bg-white p-1
                border-[1px] w-full text-black
                rounded-md outline-none
                focus:border-yellow-300 text-[14px]'
                value={source}
                onChange={(e)=>{
                    setSource(e.target.value);
                    setSourceChange(true)
                }}
            />

            {addressList?.suggestions&&sourceChange?
            <div className='shadow-md p-1 rounded-md
            absolute w-full bg-white z-20 text-black'>
            {addressList?.suggestions.map((item:any,index:number)=>(
                <h2 key={index} className='p-3 hover:bg-gray-100
                cursor-pointer'
                onClick={()=>{onSourceAddressClick(item)}}
                >{item.full_address}</h2>
            ))}
           </div>:null}
        </div>
        <div className='relative'>
            <label className='text-black dark:text-white text-[13px]'>Destination Address</label>
            <input type="text"
                className='bg-white p-1 text-black
                border-[1px] w-full
                rounded-md outline-none
                focus:border-yellow-300 text-[14px]'
                value={destination}
                onChange={(e)=>{setDestination(e.target.value);setDestinationChange(true)}}
            />

            {addressList?.suggestions&&destinationChange?
            <div className='shadow-md p-1 rounded-md
            absolute w-full bg-white text-black'>
            {addressList?.suggestions.map((item:any,index:number)=>(
                <h2 key={index} className='p-3 hover:bg-gray-100
                cursor-pointer'
                onClick={()=>{
                    onDestinationAddressClick(item)}}
                >{item.full_address}</h2>
            ))}
           </div>:null}
        </div>
    </div>
  );
};

export default AutocompleteAddress;