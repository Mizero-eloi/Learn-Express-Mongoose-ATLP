const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes");

// Connect to MongoDB database
mongoose
  .connect("mongodb://localhost:27017/myDb", { useNewUrlParser: true })
  .then(() => {
    const app = express();

    // Using routes
    app.use(express.json());
    app.use("/api", routes);

    app.listen(5000, () => {
      console.log("Server has started!");
    });
    console.log("Database Connected Successfully !");
  });
