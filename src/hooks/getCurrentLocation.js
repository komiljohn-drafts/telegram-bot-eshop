function getCurrentLocation(setPlacemark) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }

  function showPosition(position) {
    setPlacemark([position.coords.latitude, position.coords.longitude]);
    //   "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
  }
}

export default getCurrentLocation;
