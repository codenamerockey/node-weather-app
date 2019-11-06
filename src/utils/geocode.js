const request = require('request');

//GeoCoding
//Address -> Lat/Long -> Weather
const geoCode = (address, callBack) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiY29kZW5hbWVyb2NrZXkiLCJhIjoiY2syZHRieGU0MDJjazNicGM5YjFiNG9nNCJ9.oZQjm4ZclWPTNQOiUtCeUg&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callBack('Unable to connect to location services!');
    } else if (body.features.length === 0) {
      callBack('Unable to find location. Try another search', undefined);
    } else {
      callBack(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geoCode;
