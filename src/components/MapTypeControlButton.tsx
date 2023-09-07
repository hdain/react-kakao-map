import React, { useState } from 'react';
import { OverlayMapTypeId } from '@types';

export interface MapTypeControlButtonProps {
  button: { type: OverlayMapTypeId; icon: JSX.Element };
  onClick: (type: OverlayMapTypeId) => void;
}

function MapTypeControlButton(props: MapTypeControlButtonProps) {
  const { button, onClick } = props;
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleClick = () => {
    onClick(button.type);
    setIsActive(!isActive);
  };

  return (
    <button
      key={button.type}
      type="button"
      onClick={handleClick}
      className={`flex h-14 cursor-pointer items-center justify-center border-none bg-white p-0 text-2xl transition duration-200 ${
        isActive ? 'bg-blue-700 text-white' : ''
      }`}
    >
      {button && <button.icon />}
    </button>
  );
}

export default MapTypeControlButton;
