const express = require("express");
require("express-async-errors");
const { errorHandler, notFoundURLHandler } = require("./middlewares/errors");
const fileUpload = require("express-fileupload");
const app = express();
const port = process.env.PORT || 4000;
const router = require("./routes");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use(
    fileUpload({
        limits : {fileSize : 50*1024*1024}, //50 Mb
    })
);

app.use("/", router);

app.use("*", notFoundURLHandler);

// This function is to handle error when API hit, it always be the last middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(`The express.js app is running on port ${port}`);
});