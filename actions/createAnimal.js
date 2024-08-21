import Animal from '../models/Animal.js';
import User from '../models/User.js';
import connectDB from '../index.js';


export default async function createAnimal(data) {
    try {
        await connectDB();

        const { owner } = data;
        const ownerExists = await User.findById(owner)
        if (!ownerExists) {
            return null;
        }

        const animal = new Animal(data)
        await animal.save()
        
    } catch (e) {
        console.log(e);
        throw new Error("Could not create new Animal");
    }

};