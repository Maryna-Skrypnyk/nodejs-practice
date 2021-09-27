const express = require("express");
const morgan = require("morgan");
const got = require("got");
require("dotenv").config();
const app = express();

const { router } = require("./booksRouter");
const { response } = require("express");

const PORT = process.env.PORT || 8081;

const thirdPartyBaseUrl = "http://api.weatherbit.io/v2.0/current";
const thirdPartyApiKey = process.env.WEATHER_API_KEY;
// app.get("/home", (req, res) => {
//   res.send("get request");
// });

// app.post("/home", (req, res) => {
//   res.send("post request");
// });

// app.delete("/home", (req, res) => {
//   res.send("delete request");
// });

// app.put("/home", (req, res) => {
//   res.send("put request");
// });

// app.use((req, res) => {
//   // res.send("middleware request");
//   // res.redirect("https://google.com");
//   // res.status(500).json({ javascript: "object" });
//   res.json({ javascript: "object" });
// });

// OR 2

// Example custom Middleware
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.originalUrl}, ${new Date().toISOString()}`);
//   next();
// });

// app.get("/home", (req, res) => {
//   res.json({ javascript: "object" });
// });

// OR 3

// Example Express and npm Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for html-forms
app.use(express.static("public")); // for public-directory files

// Example npm Middleware (morgan)
app.use(morgan("tiny")); // for log
app.use("/api", router);

// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.originalUrl}, ${new Date().toISOString()}`);
//   next();
// });

//api.weatherbit.io/v2.0/current?key=94de9db0686e4f58938465027aa8ac5d&lat=50.427107&lon=30.567437

http: app.get("/api/weather", async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude) {
      return res
        .status(400)
        .json({ message: "latitude parameter is mandatory" });
    }
    if (!longitude) {
      return res
        .status(400)
        .json({ message: "longitude parameter is mandatory" });
    }

    const response = await got(thirdPartyBaseUrl, {
      searchParams: {
        key: thirdPartyApiKey,
        lat: latitude,
        lon: longitude,
      },
      responseType: "json",
    });
    const [weatherData] = response.body.data;
    const {
      city_name,
      weather: { description },
      temp,
    } = weatherData;
    res.json({ city_name, description, temp });
  } catch (err) {
    res.status(500).json({ massage: err.message });
  }
});

app.listen(PORT, (err) => {
  if (err) {
    console.error("Error at server launch:", err);
  }
  console.log(`Server works at port ${PORT}`);
});
