const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=907c7ae142e65c8fdd99dfadeb47ce4d&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!");
    } else if (body.error) {
      callback("Unable to find location!");
    } else {
      callback(undefined, {
        forecast: `${body.current.weather_descriptions[0]} .It is currently ${body.current.temperature} C out. It feels like ${body.current.feelslike} C out.`,
        wind_speed: `Wind speed is ${body.current.wind_speed}`,
        visibility: `Visibility is ${body.current.visibility}`,
      });
    }
  });
};

module.exports = forecast;
