require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

try {
  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (error) {
  console.log(error);
}

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "./client/build")));
app.use(require("./routes/User.js"));
app.use(require("./routes/Admin.js"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(process.env.PORT || 8000, () => {
  console.log("Express server listening on port %d", process.env.PORT || 8000);
});
