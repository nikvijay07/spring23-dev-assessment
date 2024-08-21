import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import createUser from './actions/createUser.js';
import createAnimal from './actions/createAnimal.js';
import createTrainingLog from './actions/createTrainingLog.js';
import connectDB from './index.js';
import getUsers from './actions/getUsers.js';
import getAnimals from './actions/getAnimals.js';
import getTrainingLogs from './actions/getTrainingLogs.js';
import User from './models/User.js';
import bcrypt from "bcrypt";

dotenv.config();
const app = express();
const APP_PORT = 5001;
app.use(express.json())
app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: true }));


app.get('/api/health', (req, res) => {
    res.json({"healthy": true})
})


app.post('/api/user', async (req, res) => {
    const { firstName, lastName, email, password, profilePicture } = req.body
    console.log(firstName)
    console.log(password)
    
    if (!firstName || !lastName || !email || !password) {
        res.status(400).json({status: "Failed", message: "Missing fields"})
    }

    try {
        const response = await createUser({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            profilePicture: profilePicture || undefined
        });
    
        res.status(200).json({status: "Success", message: "Succesfully added User!"});

    } catch (e) {
        console.log(e)
        res.status(500).json({status: "Failed", message: "Failed adding User"});
    }
})



app.post('/api/animal', async (req, res) => {
    const { name, hoursTrained, owner, dateOfBirth, profilePicture } = req.body
    
    if (!name || !hoursTrained || !owner) {
        res.status(400).json({status: "Failed", message: "Missing fields"})
    }

    try {
        const response = await createAnimal({
            name: name,
            hoursTrained: hoursTrained,
            owner: owner,
            dateOfBirth: dateOfBirth || undefined,
            profilePicture: profilePicture || undefined
        });

        res.status(200).json({status: "Success", message: "Succesfully added Animal!"});

    } catch (e) {
        console.log(e)
        res.status(500).json({status: "Failed", message: "Failed adding Animal"});
    }
})



app.post('/api/training', async (req, res) => {

    const { date, description, hours, animal, user, trainingLogVideo } = req.body
    
    if (!date || !description || !hours || !animal || !user) {
        res.status(400).json({status: "Failed", message: "Missing fields"})
    }

    try {
        const response = await createTrainingLog({
            date: date,
            description: description,
            hours: hours,
            animal: animal,
            user: user,
            trainingLogVideo: trainingLogVideo || undefined
        });

        res.status(200).json({status: "Success", message: "Succesfully added Training Log!"});

    } catch (e) {
        console.log(e)
        if (e.message == "Animal does not belong to specified user") {
            return res.status(400).json({status: "Failed", message: e.message})
        }


        res.status(500).json({status: "Failed", message: "Failed adding Training Log"});
    }
})



app.get('/api/admin/users', async (req, res) => {

    var lastId = req.query.lastId
    var limit = parseInt(req.query.limit, 10);

    try {
        const allUsers = await getUsers(lastId, limit)
        return res.status(200).send(allUsers)
    } catch(e) {
        return res.status(500).json({status: "Failed", message: "Failed getting all users"})
    }
})



app.get('/api/admin/training', async (req, res) => {


    var lastId = req.query.lastId
    var limit = parseInt(req.query.limit, 10);

    try {
        const allTrainingLogs = await getTrainingLogs(lastId, limit)
        return res.status(200).send(allTrainingLogs)
    } catch(e) {
        return res.status(500).json({status: "Failed", message: "Failed getting all training logs"})
    }
})




app.get('/api/admin/animals', async (req, res) => {

    var lastId = req.query.lastId
    var limit = parseInt(req.query.limit, 10);

    try {
        const allAnimals = await getAnimals(lastId, limit)
        return res.status(200).send(allAnimals)
    } catch(e) {
        return res.status(500).json({status: "Failed", message: "Failed getting all animals"})
    }
})


app.post('/api/user/login', async (req, res) => {
    
    const email = req.body.email
    const userExists = await User.findOne({'email': email})
    if (!userExists) {
        return res.status(403).json({status: "Failed", message: "Email is invalid"})
    }

    const inputPassword = req.body.password
    console.log(inputPassword)
    console.log(userExists.password)
    const loginValid = bcrypt.compareSync(inputPassword, userExists.password)

    if (loginValid) {
        return res.status(200).send("Login Successful!")
    } 
    return res.status(403).json({status: "Failed", message: "Email/Password combo is invalid"})
})





connectDB()
app.listen(APP_PORT, () => {
    console.log(`api listening at http://localhost:${APP_PORT}`)
})


