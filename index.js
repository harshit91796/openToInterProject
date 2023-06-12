
const express = require('express');
const mongoose = require('mongoose');
const router = require('./src/routes/routes')
const app = express();
const dotenv = require('dotenv');
dotenv.config();



app.use(express.json());


mongoose.connect(process.env.MONGO_URI).then( () => {
    console.log('connected to database')}
).catch(err => console.log(err));

app.use('/',router)

app.listen(process.env.PORT,(req,res)=>{
    console.log('server is running')
})