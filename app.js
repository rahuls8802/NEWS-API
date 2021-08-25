const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
require("dotenv").config();
const port = 3000;

// Static Files
app.use(express.static("public"));

// Templating Engine
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

// Auth-O
// app.use(
//   auth({
//     authRequired: false,
//     issuerBaseURL: process.env.ISSUER_BASE_URL,
//     baseURL: process.env.BASE_URL,
//     clientID: process.env.CLIENT_ID,
//     secret: process.env.SECRET,
//     idpLogout: true,
//   })
// );

//Connect to Mongo
mongoose
  .connect(
    "mongodb+srv://rahul:raul123@cluster0.ayi7t.mongodb.net/newsDB?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// Routes
const newsRouter = require("./src/routes/news");
const router = require("./src/routes/user");

app.use("/", router);
app.use("/", newsRouter);
app.use("/article", newsRouter);

// Listen on port 5000
app.listen(port, () => console.log(`Listening on port ${port}`));
