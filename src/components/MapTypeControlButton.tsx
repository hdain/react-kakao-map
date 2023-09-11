import React, { useState } from 'react';
import { OverlayMapTypeId } from '@types';
import { IconType } from 'react-icons';

export interface MapTypeControlButtonProps {
  button: { type: OverlayMapTypeId; icon: IconType };
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
      className={`flex h-14 cursor-pointer items-center justify-center border-none p-0 text-2xl transition duration-200 ${
        isActive ? 'bg-blue-700 text-white' : 'bg-white'
      }`}
    >
      {button && <button.icon />}
    </button>
  );
}

export default MapTypeControlButton;
