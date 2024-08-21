import Animal from '../models/Animal.js';
import TrainingLog from '../models/Training.js';
import User from '../models/User.js';
import connectDB from '../index.js';

export default async function createTrainingLog(data) {
    try {
        await connectDB();

        const { user, animal } = data;
        const ownerExists = await User.findById(user)
        
        if (!ownerExists) {
            throw new Error("Owner does not exist")
        }
        const animalExists = await Animal.findById(animal)
        if (!animalExists) {
            throw new Error("Animal does not exist")
        }

        if (animalExists.owner != ownerExists.id) {
            throw new Error("Animal does not belong to specified user")
        }

        const trainingLog = new TrainingLog(data)
        await trainingLog.save()
    } catch (e) {
        console.log(e);
        throw e;
    }

};
