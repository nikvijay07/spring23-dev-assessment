import User from '../models/User.js';
import connectDB from '../index.js';
import bcrypt from "bcrypt";

export default async function createUser(data) {
    try {
        await connectDB();
        const { ...userData } = data


        //hard difficulty
        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(data.password, salt);
        
        userData.password = hashedPassword
        
        const userSchema = new User({
            ...userData,
        });

        await userSchema.save();
    } catch (e) {
        console.log(e);
        throw new Error("Could not create new person");
    }

};
