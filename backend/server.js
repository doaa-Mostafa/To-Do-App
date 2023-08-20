require('dotenv').config() // for => .env
const cors = require('cors');

const express = require('express')
const mongoose = require('mongoose')
const  taskRoutes = require('./routes/tasks')
const  userRoutes = require('./routes/user')
// express app
const app=express()
app.use(cors());

// middleware => help tracing requests in console
app.use(express.json()) // => make possible access to req.body
app.use((req,res,next)=>{
    console.log(req.path, req.method)
    next()
})

// routes 
app.use('/api/tasks',taskRoutes) // =>tasks.js
app.use('/api/user',userRoutes) // =>user.js

// connect to db
mongoose.connect(process.env.MONG_URI)
.then (()=> {
    // listen for requests
    // listen to request if and only if connected to db
    app.listen(process.env.PORT, () => {
    console.log('connected to database & lisning on port',process.env.PORT)
})
})
.catch((error)=>{console.log(error)}) // => if URI/username/password is wrong 

