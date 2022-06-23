const getGeolocation = () => {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 30000,
  };

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

export default getGeolocation;
