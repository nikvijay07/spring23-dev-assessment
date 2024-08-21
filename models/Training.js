import mongoose from 'mongoose';
const { ObjectId }  = mongoose.Types

const trainingSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    hours: {
        type: Number, 
        required: true
    },
    animal: {
        type: ObjectId,
        required: true
    },
    user: {
        type: ObjectId,
        required: true
    },
    trainingLogVideo: {
        type: String
    }
});

// Create the Person model
const TrainingLog = mongoose.model('TrainingLog', trainingSchema, 'training_info');
export default TrainingLog
