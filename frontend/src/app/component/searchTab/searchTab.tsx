import React from 'react'
import AutocompleteAddress from './autocompleteAddress'
import Cars from './cars';
import Modes from './modes';

const SearchTab: React.FC = () => {
    return (
        <div className='p-5 '>
        <AutocompleteAddress/>

        <Modes/>
        <Cars/>

        </div>
    );
  };

  export default SearchTab;