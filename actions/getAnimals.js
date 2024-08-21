import connectDB from '../index.js';
import Animal from "../models/Animal.js";

export default async function getAnimals(lastId = null, limit = 10) {
    try {
        await connectDB();
        if (lastId) {
            var animals = await Animal.find({'_id': { $gt: lastId }}).limit(limit);
        } else {
            var animals = await Animal.find().limit(limit);
        }
        return animals;
    } catch (e) {
        console.log(e);
        throw new Error("Could not retrieve animals");
    }

}