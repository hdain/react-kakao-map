import React, { useCallback } from 'react';
import { BsDashLg, BsPlusLg } from 'react-icons/bs';
import { zoomIn, zoomOut } from '../api';
import { useMap } from '../hooks';

function MapZoomControl() {
  const { map } = useMap();
  const buttonClasses =
    'flex items-center justify-center border-none rounded-full bg-opacity-80 bg-black text-white h-14 cursor-pointer first:mb-2';

  const handleZoomIn = useCallback(() => {
    zoomIn(map);
  }, [map]);

  const handleZoomOut = useCallback(() => {
    zoomOut(map);
  }, [map]);

  return (
    <div className="mt-4 flex flex-col overflow-hidden rounded">
      <button type="button" onClick={handleZoomIn} className={buttonClasses}>
        <BsPlusLg />
      </button>
      <button type="button" onClick={handleZoomOut} className={buttonClasses}>
        <BsDashLg />
      </button>
    </div>
  );
}

export default MapZoomControl;
