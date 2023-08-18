import { createContext } from 'react';
import { Map, Overlay } from '@types';

type MapContextType = {
  map: Map;
  overlay: Overlay;
};

const MapContext = createContext<MapContextType>({ map: {}, overlay: {} });

export default MapContext;
