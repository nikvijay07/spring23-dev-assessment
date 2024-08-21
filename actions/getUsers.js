import connectDB from '../index.js';
import User from "../models/User.js";

export default async function getUsers(lastId = null, limit = 10) {
    try {
        await connectDB();


        if (lastId) {
            var users = await User.find({'_id': { $gt: lastId }}).limit(limit);
        } else {
            var users = await User.find().limit(limit);
        }
        return users

    } catch (e) {
        console.log(e);
        throw new Error("Could not retrieve users");
    }

}