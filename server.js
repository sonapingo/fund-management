const express = require("express")
const passport = require("passport")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const users = require("./routes/api/users")
const profiles = require("./routes/api/profiles")

const db = require('./config/keys').mongoURI

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

mongoose.connect(db)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err))

// passport初始化
app.use(passport.initialize())

require("./config/passport")(passport)

app.use("/api/users",users)
app.use("/api/profiles", profiles)

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server runing on port ${port}`)
})

