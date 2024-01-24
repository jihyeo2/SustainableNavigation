import { DestinationCordiContext } from '../../context/destinationCordiContext';
import { SourceCordiContext } from '../../context/sourceCordiContext';
import React, { useContext } from 'react'
import { Marker } from 'react-map-gl'

const Markers: React.FC = () => {

  
    const {sourceCoordinates,setSourceCordinates}
    =useContext(SourceCordiContext);
    const {destinationCordinates,setDestinationCordinates}
    =useContext(DestinationCordiContext);

  return (
    <div>
                {/* Source marker  */}
             {(sourceCoordinates && sourceCoordinates.length!=0)? <Marker 
                longitude={sourceCoordinates?.lng} 
                latitude={sourceCoordinates?.lat} 
                anchor="bottom" >
                
                 
                  <img src="./location.png" 
                 className='w-10 h-10'
                 />
                
                 
                </Marker>:null}


                {/* Destination Marker  */}

                {(destinationCordinates && destinationCordinates.length!=0)? <Marker 
                longitude={destinationCordinates?.lng} 
                latitude={destinationCordinates?.lat} 
                anchor="bottom" >
                  <img src="./location.png" 
                 className='w-10 h-10'
                 />
                </Marker>:null}

    </div>
  );
};

export default Markers;