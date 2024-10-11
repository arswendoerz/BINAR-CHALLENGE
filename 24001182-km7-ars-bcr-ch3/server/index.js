require('dotenv').config(); 

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");
const { errorHandler, notFoundURLHandler } = require("./middlewares/errors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Ping Successfully!");
});

app.use("/", routes);
app.use(notFoundURLHandler);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`The express.js app is running on port ${PORT}`);
});
