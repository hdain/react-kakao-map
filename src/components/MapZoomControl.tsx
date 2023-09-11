import React from 'react';
import { BsDashLg, BsPlusLg } from 'react-icons/bs';
import { zoomIn, zoomOut } from '../api';

function MapZoomControl() {
  const buttonClasses =
    'flex items-center justify-center border-none rounded-full bg-opacity-80 bg-black text-white h-14 cursor-pointer first:mb-2';

  return (
    <div className="mt-4 flex flex-col overflow-hidden rounded">
      <button type="button" onClick={zoomIn} className={buttonClasses}>
        <BsPlusLg />
      </button>
      <button type="button" onClick={zoomOut} className={buttonClasses}>
        <BsDashLg />
      </button>
    </div>
  );
}

export default MapZoomControl;
