import { useContext } from 'react';
import { MapContext } from '../context';

const useMap = () => {
  const map = useContext(MapContext);

  if (!map) {
    throw new Error('useMap must be used within a MapProvider');
  }

  return map;
};

export default useMap;
