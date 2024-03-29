const request = require('request');

const forecast = (latitude, longitude, callBack) => {
  const url = `https://api.darksky.net/forecast/e02983d879eaf5e06769f66af37eda7b/${latitude},${longitude}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callBack('Unable to connect to weather service', undefined);
    } else if (body.error) {
      callBack('Unable to find location', undefined);
    } else {
      console.log(body.daily.data[0]);
      callBack(
        undefined,
        body.daily.data[0].summary +
          ` "It is currently ${body.currently.temperature} degrees out. The high today is ${body.daily.data[0].temperatureHigh} with a low of ${body.daily.data[0].temperatureLow}. There is a ${body.currently.precipProbability}% chance of rain"`
      );
    }
  });
};

module.exports = forecast;
