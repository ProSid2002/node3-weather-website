const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();

// Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup Handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static dirctory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Siddharth Sharma",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Siddharth Sharma",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    msg: "Do you need any help??",
    title: "Help",
    name: "Siddharth Sharma",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address)
    return res.send({
      error: "Please provide an address term",
    });
  // res.send({
  //   forecast: "Clear",
  //   location: "Philadelphia",
  //   address: req.query.address,
  // });

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) return res.send({ error });
      forecast(latitude, longitude, (error, forecast) => {
        if (error) return res.send({ error });
        res.send({
          location,
          address: req.query.address,
          forecast,
        });
      });
    }
  );
});

// app.get("/products", (req, res) => {
//   if (!req.query.search) {
//     res.send({
//       error: "You must provide a search term",
//     });
//     return;
//   }
//   console.log(req.query);
//   res.send({
//     products: [],
//   });
// });

app.get("/help/*", (req, res) => {
  res.render("404", {
    error: "Help Article Not Found!!!",
    title: "404",
    name: "Siddharth Sharma",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    error: "404 Page Not Found!!!",
    title: "404",
    name: "Siddharth Sharma",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
