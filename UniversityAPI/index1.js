import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "http://universities.hipolabs.com/search?name=middle"
    );
    const result = response.data;
    // console.log(result);
    res.render("search_university.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("search_university.ejs", {
      error: error.message,
    });
  }
});

app.post("/submit", async (req, res) => {
  try {
    const UniversityName = req.body["UniName"];
    const response = await axios.get(
      `http://universities.hipolabs.com/search?name=${UniversityName}`
    );
    const result = response.data;
    // console.log(result);
    res.render("search_university.ejs", {
      data: result,
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("search_university.ejs", {
      error: "No universities found for the given name.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
