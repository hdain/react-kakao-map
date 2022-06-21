const getGeolocation = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    return {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
  });
};

export default getGeolocation;
