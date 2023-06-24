const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport")
const connectDb = require("./config/config");

// dotenv.config
dotenv.config();

// db config
connectDb();

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

// routes
app.use("/api/users", require("./routes/userRoutes"))

const PORT = process.env.PORT || 8080

// listen
app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`)
});