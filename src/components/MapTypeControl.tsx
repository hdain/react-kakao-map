import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { RiTrafficLightLine } from 'react-icons/ri';
import { BiLandscape } from 'react-icons/bi';
import { BsBicycle } from 'react-icons/bs';
import { OverlayMapTypeId } from '@types';
import { addOverlayMapTypeId, removeOverlayMapTypeId } from '../api';
import MapTypeControlButton from './MapTypeControlButton';
import useMap from '../hooks/useMap';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #777;
  border-radius: 5px;
  overflow: hidden;
`;

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
    <Wrap>
      {list.map((button) => (
        <MapTypeControlButton key={button.type} button={button} handleTypeChange={handleTypeChange} />
      ))}
    </Wrap>
  );
}

export default MapTypeControl;