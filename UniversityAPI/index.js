import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "http://universities.hipolabs.com/search?country=Pakistan"
    );
    const result = response.data;
    console.log(result);
    res.render("search_country.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("search_country.ejs", {
      error: error.message,
    });
  }
});

app.post("/submit", async (req, res) => {
  try {
    const countryName = req.body["countryName"];

    if (!countryName || countryName.length === 0) {
      throw new Error("Country name is required.");
    }

    const response = await axios.get(
      `http://universities.hipolabs.com/search?country=${countryName}`
    );
    const result = response.data;

    if (result.length === 0) {
      throw new Error("No universities found for the given country.");
    }

    res.render("search_country.ejs", {
      data: result,
      countryName: countryName,
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("search_country.ejs", {
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
