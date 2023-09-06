import React, { useState } from 'react';

interface MapTypeControlButtonProps {
  button: { type: string; icon: any };
  handleTypeChange: (type: string) => void;
}

function MapTypeControlButton(props: MapTypeControlButtonProps) {
  const { button, handleTypeChange } = props;
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <button
      key={button.type}
      type="button"
      onClick={() => {
        handleTypeChange(button.type);
        setIsActive(!isActive);
      }}
      className={`flex h-14 cursor-pointer items-center justify-center border-none bg-white p-0 text-2xl transition duration-200 ${
        isActive ? 'bg-blue-700 text-white' : ''
      }`}
    >
      {button && <button.icon />}
    </button>
  );
}

export default MapTypeControlButton;
