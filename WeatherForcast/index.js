const express = require("express");
const axios = require("axios");

const app = express();

app.get("/", (req, res) => {
  res.render("weather.ejs");
});

app.post("/weather", async (req, res) => {
  const city = req.body.city;

  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=80ea149bd67d3f949d92253593ba8f3d
    `
  );
  const weatherInformation = response.data;

  const temperature = weatherInformation.main.temp;

  res.render("weather.ejs", { temperature });
});

app.listen(3000, () => {
  console.log("Server running on port http://localhost:3000");
});
