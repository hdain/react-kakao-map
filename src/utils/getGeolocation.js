const getGeolocation = () => {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 30000,
  };

  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error(error);
          resolve({
            latitude: 37.39525750009229,
            longitude: 127.11148651523494,
          });
        },
        options
      );
    }
  });
};

export default getGeolocation;
