import React, { useCallback, useContext } from "react";
import styled from "styled-components";
import { BsDashLg, BsPlusLg } from "react-icons/bs";
import { zoomIn, zoomOut } from "../api/getMap";
import { MapContext } from "./MapContainer";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #777;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 10px;
`;

const Button = styled.button`
  border: none;
  background: #fff;
  height: 50px;
  cursor: pointer;
  &:first-child {
    border-bottom: 1px solid #bbb;
  }
`;

const MapZoomControl = () => {
  const map = useContext(MapContext);

  const handleZoomIn = useCallback(() => {
    zoomIn(map);
  }, [map]);

  const handleZoomOut = useCallback(() => {
    zoomOut(map);
  }, [map]);

  return (
    <Wrap>
      <Button onClick={handleZoomIn}>
        <BsPlusLg />
      </Button>
      <Button onClick={handleZoomOut}>
        <BsDashLg />
      </Button>
    </Wrap>
  );
};

export default MapZoomControl;
