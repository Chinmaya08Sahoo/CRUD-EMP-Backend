const express = require("express"),
    cors = require("cors"),
    bodyParser = require("body-parser")

const app = express()
app.use(cors())
const PORT = process.env.PORT || 6500;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use("/", require("./routes"));
app.use("*", (req, res) => {
    res.status(404).send({
        success: false,
        statusCode: 404,
        displayMessage: "The endpoint you are looking for is not exist",
        err_type: "NOTFOUND",
        message: "endpoint not exist",
        description: "ERR-404",
    })
})

app.listen(PORT, () => {
    if (!PORT) {
        console.log(clc.red("No Port defined"));
        process.exit();
    }
    console.log(`Emp-system is running at http://localhost:${PORT}`);
});