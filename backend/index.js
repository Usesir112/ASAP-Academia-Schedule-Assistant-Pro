const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
require("./routes/passportJS");

//Declare the express app
const app = express();

// Set the CORS headers to allow requests from your client-side application
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Load enviroment variables from .env file
dotenv.config();

//Set Port
const port = 3000;

// Import the curriculum route from curriculum.js
const curriculumRouter = require("./routes/curriculm");
const lecturersRouter = require("./routes/lecturers");
const subjectsRouter = require("./routes/subjects");
const semestersRoutes = require("./routes/semesters");
const roomsRouter = require("./routes/rooms");
const scheduleRouter = require("./routes/schedules");

const oAuthRouter = require("./routes/oAuth");

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use("/", oAuthRouter);

// Use the curriculum route in the app
app.use("/api/curriculum", curriculumRouter);
app.use("/api/lecturer", lecturersRouter);
app.use("/api/subject", subjectsRouter);
app.use("/api/semester", semestersRoutes);
app.use("/api/room", roomsRouter);
app.use("/api/schedule", scheduleRouter);

//List for request (:
const art = `
 -----------------------------------------
|              _____              _____   |
|     /\\      / ____|     /\\     |  __ \\  |
|    /  \\    | (___      /  \\    | |__) | |
|   / /\\ \\    \\___ \\    / /\\ \\   |  ___/  |
|  / ____ \\   ____) |  / ____ \\  | |      |  
| /_/    \\_\\ |_____ / /_/    \\_\\ |_|      |  
|                                         |
|    App listening on port ${port} (:        |
 -----------------------------------------
`;

app.listen(port, () => {
  console.log(art);
});
