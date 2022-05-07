

const express = require('express')
const app = express()
const connectDB = require('./Config/db')
const dotenv = require('dotenv')
const router = require('./Routes/index')
// const bodyParser = require('body-parser')
const cors = require('cors')

// const fileupload = require('express-fileupload');

// app.use(fileupload({ useTempFiles: true }))

dotenv.config({ path: './Config/config.env' });
connectDB()

app.use(express.json({ limit: '25mb' }))
app.use(express.urlencoded({ limit: "25mb", extended: true }))




app.use("/", router);

app.listen(5000)