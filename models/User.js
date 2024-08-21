import mongoose from 'mongoose';
const { ObjectId }  = mongoose.Types

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
    }
});

// Create the Person model
const User = mongoose.model('User', userSchema, 'user_info');
export default User
