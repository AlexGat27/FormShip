const express = require("express")
const bodyParser = require("body-parser")
const formRouter = require("./routes/formRouter")

app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/v1/form', formRouter)

const port = 3000;
const hostname = '0.0.0.0'

app.listen(port, hostname, () => {console.log("Server has been started");})