import connectDB from '../index.js';
import TrainingLog from "../models/Training.js";

export default async function getTrainingLogs(lastId = null, limit = 10) {
    try {
        await connectDB();
        if (lastId) {
            var trainingLogs = await TrainingLog.find({'_id': { $gt: lastId }}).limit(limit);
        } else {
            var trainingLogs = await TrainingLog.find().limit(limit);
        }
        return trainingLogs;
    } catch (e) {
        console.log(e);
        throw new Error("Could not retrieve training logs");
    }

}