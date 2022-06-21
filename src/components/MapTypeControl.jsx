import React, { useCallback, useContext, useState } from "react";
import styled from "styled-components";
import { RiTrafficLightLine } from "react-icons/ri";
import { BiLandscape } from "react-icons/bi";
import { BsBicycle } from "react-icons/bs";
import { MapContext } from "./MapContainer";
import { setOverlayMapTypeId } from "../api/getMap";
import MapTypeControlButton from "./MapTypeControlButton";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #777;
  border-radius: 5px;
  overflow: hidden;
`;

const list = [
  {
    type: "bicycle",
    icon: BsBicycle,
  },
  {
    type: "traffic",
    icon: RiTrafficLightLine,
  },
  {
    type: "terrain",
    icon: BiLandscape,
  },
];

const MapTypeControl = () => {
  const map = useContext(MapContext);
  const [type, setType] = useState([]);

  const handleTypeChange = useCallback(
    (maptype) => {
      setType((prev) => [...new Set([...prev, maptype])]);
      if (type.includes(maptype)) {
        setOverlayMapTypeId(map, maptype, "remove");
        setType((prev) => prev.filter((value) => value !== maptype));
      } else {
        setOverlayMapTypeId(map, maptype, "add");
      }
    },
    [map, type]
  );

  return (
    <Wrap>
      {list.map((button) => (
        <MapTypeControlButton
          key={button.type}
          button={button}
          handleTypeChange={handleTypeChange}
        />
      ))}
    </Wrap>
  );
};

export default MapTypeControl;
