import React, { useCallback, useState } from 'react';
import { RiTrafficLightLine } from 'react-icons/ri';
import { BiLandscape } from 'react-icons/bi';
import { BsBicycle } from 'react-icons/bs';
import { OverlayMapTypeId } from '@types';
import { addOverlayMapTypeId, removeOverlayMapTypeId } from '../api';
import MapTypeControlButton from './MapTypeControlButton';
import { useMap } from '../hooks';

const list = [
  {
    type: 'BICYCLE',
    icon: BsBicycle,
  },
  {
    type: 'TRAFFIC',
    icon: RiTrafficLightLine,
  },
  {
    type: 'TERRAIN',
    icon: BiLandscape,
  },
];

function MapTypeControl() {
  const { map } = useMap();
  const [type, setType] = useState<Array<OverlayMapTypeId>>([]);

  const handleTypeChange = useCallback(
    (mapType: OverlayMapTypeId) => {
      setType((prev) => [...new Set([...prev, mapType])]);
      if (type.includes(mapType)) {
        removeOverlayMapTypeId(map, mapType);
        setType((prev) => prev.filter((value) => value !== mapType));
      } else {
        addOverlayMapTypeId(map, mapType);
      }
    },
    [map, type],
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
