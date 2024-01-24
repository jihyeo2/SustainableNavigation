import { ModeDataContext } from '../../context/modeDataContext';
import ModesList from '../../data/modesList'
import Image from 'next/image'
import React, { useContext, useState } from 'react'

const Modes: React.FC = () => {
  const {modeData, setModeData} = useContext(ModeDataContext);

  return (
    <div className='mt-3'>
        <h2 className='font-medium text-[14px] '>Mode of Transportation</h2>
        <div className='grid
        grid-cols-3
        md:grid-cols-2
        lg:grid-cols-3
         '>
            {ModesList.map((item,index)=>(
                <div key={index} className={`m-2
                 p-2 border-[1px] rounded-md
                 hover:border-yellow-400
                 cursor-pointer
                 ${index==modeData - 1
                    ?'border-yellow-400 border-[2px]'
                    :null}`}
                 onClick={()=>setModeData(index + 1)}>
                    <Image src={item.image}
                    alt={item.name}
                    width={35}
                    height={50}
                    className='w-full'
                    />
                    <h2 className='text-[10px] text-black dark:text-white'>{item.name}</h2>
                </div>
            ))}
        </div>
    </div>
  );
};

export default Modes;