import React, { useCallback, useState } from 'react';
import { RiTrafficLightLine } from 'react-icons/ri';
import { BiLandscape } from 'react-icons/bi';
import { BsBicycle } from 'react-icons/bs';
import { OverlayMapTypeId } from '@types';
import { addOverlayMapTypeId, removeOverlayMapTypeId } from '../api';
import MapTypeControlButton from './MapTypeControlButton';

const list = [
  {
    type: 'BICYCLE' as OverlayMapTypeId,
    icon: BsBicycle,
  },
  {
    type: 'TRAFFIC' as OverlayMapTypeId,
    icon: RiTrafficLightLine,
  },
  {
    type: 'TERRAIN' as OverlayMapTypeId,
    icon: BiLandscape,
  },
];

function MapTypeControl() {
  const [type, setType] = useState<Array<OverlayMapTypeId>>([]);

  const handleTypeChange = useCallback(
    (mapType: OverlayMapTypeId) => {
      setType((prev) => [...new Set([...prev, mapType])]);
      if (type.includes(mapType)) {
        removeOverlayMapTypeId(mapType);
        setType((prev) => prev.filter((value) => value !== mapType));
      } else {
        addOverlayMapTypeId(mapType);
      }
    },
    [type],
  );

  return (
    <div className="flex flex-col overflow-hidden rounded border border-gray-300">
      {list.map((button) => (
        <MapTypeControlButton key={button.type} button={button} onClick={handleTypeChange} />
      ))}
    </div>
  );
}

export default MapTypeControl;
