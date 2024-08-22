import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import createUser from './actions/createUser.js';
import createAnimal from './actions/createAnimal.js';
import createTrainingLog from './actions/createTrainingLog.js';
import connectDB from './index.js';
import User from './models/User.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import getHealth from "./api/getHealth.js"
import addUser from "./api/addUser.js"
import addTrainingLog from "./api/addAnimal.js"
import addAnimal from "./api/addAnimal.js"
import getTrainingLogs from "./api/admin/getTrainingLogs.js"
import getUsers from "./api/admin/getUsers.js"
import getAnimals from './api/admin/getAnimals.js';
import login from './api/login.js'
import verify from './api/verify.js'
import jwtAuthentication from './jwtAuthentication.js';


dotenv.config();
const app = express();
const APP_PORT = 5001;
app.use(express.json())
app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: true }));

connectDB()



app.use('/api', login)
app.use('/api', verify)

app.use('/api', jwtAuthentication, getHealth)


app.use('/api', jwtAuthentication, addUser)
app.use('/api', jwtAuthentication, addAnimal)
app.use('/api', jwtAuthentication, addTrainingLog)


app.use('/api',jwtAuthentication, getTrainingLogs)
app.use('/api',jwtAuthentication, getUsers)
app.use('/api', jwtAuthentication, getAnimals)

app.listen(APP_PORT, () => {
    console.log(`api listening at http://localhost:${APP_PORT}`)
})


