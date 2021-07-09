const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
var cors = require('cors')

mongoose
  .connect("mongodb://localhost:27017", { useNewUrlParser: true ,useUnifiedTopology: true })
  .then(() => {
    const app = express();
    app.use(cors())
    app.use(express.json());
    app.use("/V1", routes);

    app.listen(5000, (re) => {
      console.log("Server has started!");
      console.log("http://localhost:5000/");
    });

  });
