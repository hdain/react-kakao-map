import { useEffect, useState } from 'react';
import { LatLng } from '@types';

const useGeolocation = () => {
  const [location, setLocation] = useState<LatLng>({ latitude: 37.39525750009229, longitude: 127.11148651523494 });

  useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.warn(`ERROR(${error.code}): ${error.message}`);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 5000,
      },
    );
  }, []);

  return location;
};

export default useGeolocation;
