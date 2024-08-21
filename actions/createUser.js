import User from '../models/User.js';
import connectDB from '../index.js';

export default async function createUser(data) {
    try {
        await connectDB();
        const userSchema = new User(data);
        await userSchema.save();
    } catch (e) {
        console.log(e);
        throw new Error("Could not create new person");
    }

};
