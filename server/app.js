require("dotenv").config();
const express = require("express");
const cors = require('cors')
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require('./routes/routes');

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors())
app.use("/api", routes);


const mongoClient = process.env.DATABASE_URL;
mongoose.connect(mongoClient);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});
database.once("connected", () => {
  console.log("Database Successfully Connected");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
