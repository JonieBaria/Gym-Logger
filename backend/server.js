require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const workoutroutes = require('./routes/workouts') //no need to add extension of this file
const userRoutes = require('./routes/user')

//express app
const app = express()


//middleware

app.use(express.json())

app.use((req, res, next)=>{
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/workouts', workoutroutes) //you can specify a path before the route paths in the original routes
app.use('/api/user', userRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
     //listen for requests
     app.listen(process.env.PORT, () => {
        console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error);
    })



