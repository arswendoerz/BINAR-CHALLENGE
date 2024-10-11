require('dotenv').config(); 

const express = require("express");
const routes = require("./routes");
const { errorHandler, notFoundURLHandler } = require("./middlewares/errors");
const fileUpload = require("express-fileupload"); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
    })
);

app.get("/", (req, res) => {
    res.send("Ping Successfully!");
});

app.use("/", routes);
app.use(notFoundURLHandler);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`The express.js app is running on port ${PORT}`);
});
