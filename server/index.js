const express = require("express");
const connectToDB = require("./db");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./routes/noteroutes");
const dotenv = require("dotenv");
dotenv.config();

connectToDB();
const app = express();
const port = process.env.PORT || 5000
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/notes", router);

app.listen(port, () => {
  console.log(`Server listening to port ${port}`);
});
