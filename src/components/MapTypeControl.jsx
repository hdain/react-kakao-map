import React, { useCallback, useContext, useState } from "react";
import styled from "styled-components";
import { RiTrafficLightLine } from "react-icons/ri";
import { BiLandscape } from "react-icons/bi";
import { BsBicycle } from "react-icons/bs";
import { MapContext } from "./MapContainer";
import { setOverlayMapTypeId } from "../api/getMap";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #777;
  border-radius: 5px;
  overflow: hidden;
`;

const Button = styled.button`
  border: none;
  background: #fff;
  padding: 0;
  height: 50px;
  font-size: 25px;
  cursor: pointer;
  border-bottom: 1px solid #bbb;
  &:last-child {
    border-bottom: none;
  }
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
        <Button key={button.type} onClick={() => handleTypeChange(button.type)}>
          <button.icon />
        </Button>
      ))}
    </Wrap>
  );
};

export default MapTypeControl;
