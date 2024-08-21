import mongoose from 'mongoose';


const { ObjectId }  = mongoose.Types

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    hoursTrained: {
        type: Number,
        required: true
    },
    owner: {
        type: ObjectId, 
        required: true
    },
    dateOfBirth: {
        type: Date,
    },
    profilePicture: {
        type: String,
    }
});

// Create the Person model
const Animal = mongoose.model('Animal', animalSchema, 'animals_info');
export default Animal
