import { DirectionDataContext } from '../../context/directionDataContext';
import { ModeDataContext } from '../../context/modeDataContext';
import { CarbonDataContext } from "../../context/carbonDataContext";
import React, { useContext } from 'react'

const DistanceTime: React.FC = () => {
  const {directionData, setDirectionData} = useContext(DirectionDataContext);
  const {modeData, setModeData} = useContext(ModeDataContext);
  const {carbonData, setCarbonData} = useContext(CarbonDataContext);


  return directionData[modeData - 1]?.routes&&carbonData[modeData - 1]&&(
    <div>
    <div className='mt-5 flex flex-col h-screen h-1/2 justify-around'>
      <div className='flex justify-around'>
        <div className='flex flex-col items-center'>
          <p className='text-lg'>Miles</p>
          <p className='text-2xl font-bold'>{(directionData[modeData - 1].routes[0].distance*0.000621371192).toFixed(2)}</p>
        </div>
        <div className='flex flex-col items-center'>
          <p className='text-lg'>Minutes</p>
          <p className='text-2xl font-bold'>{(directionData[modeData - 1].routes[0].duration/60).toFixed(2)}</p>
        </div>
        <div className='flex flex-col items-center'>
          <p className='text-lg'>KG of CO2</p>
          <p className='text-2xl font-bold'>{(carbonData[modeData - 1]).toFixed(2)}</p>
        </div>
      </div>
      {modeData == 1 && (
        <div className='flex justify-around'>
          <div className='flex flex-col items-center'>
            <p className='text-lg'>KG of CO2 Saved Compared to Driving</p>
            <p className='text-2xl font-bold'>{(carbonData[2] - carbonData[0]).toFixed(2)}</p>
          </div>
          <div className='flex flex-col items-center'>
            <p className='text-lg'>KG of CO2 Wasted Compared to Biking</p>
            <p className='text-2xl font-bold'>{(carbonData[1] - carbonData[0]).toFixed(2)}</p>
          </div>
        </div>
      )}
      {modeData == 2 && (
        <div className='flex justify-around'>
          <div className='flex flex-col items-center'>
            <p className='text-lg'>KG of CO2 Saved Compared to Driving</p>
            <p className='text-2xl font-bold'>{(carbonData[2] - carbonData[1]).toFixed(2)}</p>
          </div>
          <div className='flex flex-col items-center'>
            <p className='text-lg'>KG of CO2 Saved Compared to Walking</p>
            <p className='text-2xl font-bold'>{(carbonData[0] - carbonData[1]).toFixed(2)}</p>
          </div>
        </div>
      )}
      {modeData == 3 && (
        <div className='flex justify-around'>
          <div className='flex flex-col items-center'>
            <p className='text-lg'>KG of CO2 Wasted Compared to Walking</p>
            <p className='text-2xl font-bold'>{(carbonData[2] - carbonData[0]).toFixed(2)}</p>
          </div>
          <div className='flex flex-col items-center'>
            <p className='text-lg'>KG of CO2 Wasted Compared to Biking</p>
            <p className='text-2xl font-bold'>{(carbonData[2] - carbonData[1]).toFixed(2)}</p>
          </div>
        </div>
      )}
      {modeData == 1 && (
        <div className='flex justify-around'>
          <div className='flex flex-col items-center'>
            <p className='text-lg'>Trees Saved Compared to Driving</p>
            <p className='text-2xl font-bold'>{((carbonData[2] - carbonData[0])/20).toFixed(2)}</p>
          </div>
          <div className='flex flex-col items-center'>
            <p className='text-lg'>Trees Destroyed Compared to Biking</p>
            <p className='text-2xl font-bold'>{((carbonData[1] - carbonData[0])/20).toFixed(2)}</p>
          </div>
        </div>
      )}
      {modeData == 2 && (
        <div className='flex justify-around'>
          <div className='flex flex-col items-center'>
            <p className='text-lg'>Trees Saved Compared to Driving</p>
            <p className='text-2xl font-bold'>{((carbonData[2] - carbonData[1])/20).toFixed(2)}</p>
          </div>
          <div className='flex flex-col items-center'>
            <p className='text-lg'>Trees Saved Compared to Walking</p>
            <p className='text-2xl font-bold'>{((carbonData[0] - carbonData[1])/20).toFixed(2)}</p>
          </div>
        </div>
      )}
      {modeData == 3 && (
        <div className='flex justify-around'>
          <div className='flex flex-col items-center'>
            <p className='text-lg'>Trees Destroyed Compared to Driving</p>
            <p className='text-2xl font-bold'>{((carbonData[2] - carbonData[0])/20).toFixed(2)}</p>
          </div>
          <div className='flex flex-col items-center'>
            <p className='text-lg'>Trees Destroyed Compared to Walking</p>
            <p className='text-2xl font-bold'>{((carbonData[2] - carbonData[1])/20).toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
    </div>
  )
}

export default DistanceTime;