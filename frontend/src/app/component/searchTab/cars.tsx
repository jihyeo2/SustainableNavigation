import carsList from '@/app/data/carsList';
import { DirectionDataContext } from '../../context/directionDataContext';
import { CarbonDataContext } from '../../context/carbonDataContext';
import React, { useContext, useEffect, useState } from 'react'
import { ModeDataContext } from '../../context/modeDataContext';
import '../../css/fonts.css'

const Cars: React.FC = () => {

    const [userInput,setUserInput]=useState({
      make: '',
      model: '',
      numPassenger: 1
    });

    const [makeList, setmakeList] = useState<any>();
    const [modelList, setmodelList] = useState<any>();
    const {modeData, setModeData} = useContext(ModeDataContext);
    const {carbonData, setCarbonData} = useContext(CarbonDataContext);

    const MAKES_ENDPOINT =
    "https://cs-3300-397421.ue.r.appspot.com/info/vehicle_makes";

    const EMISSIONS_ENDPOINT =
    "https://cs-3300-397421.ue.r.appspot.com/info/emissions";

    const getMakes = async () => {
      const response = await fetch(MAKES_ENDPOINT, {
        method: 'GET',
        headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        }
      });
      const makes = await response.json();
      setmakeList(makes);
    };

    const getModels = async () => {
      const response = await fetch(
        MAKES_ENDPOINT +
      "/" +
      userInput.make,
      {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        }
      }
      );
      const res = await response.json();
      const models = res.models;
      console.log(models);
      setmodelList(models);
    };

    const getEmissions = async () => {
      const response = await fetch(
        EMISSIONS_ENDPOINT +
        "/" +
        userInput.make +
        "/" +
        userInput.model +
        "/" +
        directionData[2].routes[0].distance*0.000621371192 +
        "/" +
        userInput.numPassenger
        ,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
          }
        }
      );
      const emission = await response.json();
      setCarbonData([carbonData[0], carbonData[1], emission]);
    };

    const getOtherEmissions = async () => {
      const walkingResponse = await fetch(
        EMISSIONS_ENDPOINT +
        "/other/" +
        "walk/" +
        directionData[2].routes[0].distance*0.000621371192 +
        "/" +
        userInput.numPassenger
        ,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
          }
        }
      );

      const walkingEmissions = await walkingResponse.json();

      const cyclingResponse = await fetch(
        EMISSIONS_ENDPOINT +
        "/other/" +
        "bike/" +
        directionData[2].routes[0].distance*0.000621371192 +
        "/" +
        userInput.numPassenger
        ,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
          }
        }
      );
      const cyclingEmissions = await cyclingResponse.json();

      setCarbonData([walkingEmissions, cyclingEmissions, (directionData[2].routes[0].distance*0.000621371192) * 0.16439]);
    };


    useEffect(() => {
      getMakes();
    }, []);

    useEffect(() => {
      if (userInput.make) {
        getModels();
      }
    }, [userInput.make]);

    const {directionData, setDirectionData}
    = useContext(DirectionDataContext);

    useEffect(() => {
      console.log("user input changed");
      if (userInput.numPassenger) {
        getOtherEmissions();
      }

      if (userInput.make && userInput.model && userInput.numPassenger) {
        getEmissions();
      }
      console.log(carbonData);
    }, [directionData, modeData, userInput]);

    const handleChange=(event:any)=>{
      setUserInput({
        ...userInput,
        [event.target.name]:event.target.value
      });
    };

  return (
      <div className='mt-3 font-nunito'>
        <h2 className='font-medium text-[14px] '>Select Car</h2>
        <div>
          <label className='text-black dark:text-white text-[12px]'>Makes</label>
          <select className="select text-black
          select-bordered w-full max-w-lg"
          name="make"
          onChange={handleChange}
        >
            <option disabled selected className='text-black'>
              Make
            </option>
            {makeList&&makeList.map((make:string,index:number)=>(
              <option key={index} className='text-black'>{make}</option>
            ))}
          </select>
        </div>
        <div>
          <label className='text-black dark:text-white text-[12px]'>Models</label>
          <select className="select text-black
          select-bordered w-full max-w-lg"
          name="model"
          onChange={handleChange}
        >
            <option disabled selected className='text-black'>
              Model
            </option>
            {modelList&&modelList.map((model:string,index:number)=>(
              <option key={index} className='text-black'>{model}</option>
            ))}
          </select>
        </div>
        <div className="">
          <label className='text-black dark:text-white text-[12px]'>Number of Passengers</label>
          <div>
            <input type="number" min="1" max="20" name="numPassenger" onChange={handleChange}
              className='text-black w-full'
            ></input>
          </div>
        </div>
    </div>
  );
};

export default Cars;