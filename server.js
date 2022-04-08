const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const users = require("./routes/api/users")

const db = require('./config/keys').mongoURI

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

mongoose.connect(db)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err))

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.use("/api/users",users)

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server runing on port ${port}`)
})

