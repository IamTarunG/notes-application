const express = require("express");
const connectToDB = require("./db");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./routes/noteroutes");
const dotenv = require("dotenv");
dotenv.config();

connectToDB();
const app = express();
const port = 5000;
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/notes", router);

app.listen(port, () => {
  console.log(`Server listening to port ${port}`);
});
app.use('/some-route', require(path.join(__dirname, 'routes', 'noteroutes.js')))
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend', 'build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'build', 'index.html'));
  })
}