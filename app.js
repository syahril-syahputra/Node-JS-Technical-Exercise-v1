const express = require('express')
const validateDate = require("./middlewares/validateDate");
const calculate = require('./routes/calculate');

const app = express();
// app.use(express.urlencoded({extended:true}))
app.use(express.json())

require("dotenv").config()

app.get("/", (req, res) => {
    res.send("Wellcome... This Is For Node JS Technical Exercise v1")
})
app.use("/calculate", validateDate, calculate)

app.listen(process.env.PORT, (error) => {
    if (error) {
        console.log("Error occured, server can't start", error)
    }else
    {
        console.log("App Start In Port : " + process.env.PORT)
    }
});