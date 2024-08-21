import mongoose from 'mongoose';
const username = "nikvijay07"
const password = "BogApplication2024"
const DB_URL_1 = `mongodb+srv://${username}:${password}@animal-training.ahdvf.mongodb.net/?retryWrites=true&w=majority&appName=animal-training`

export default async function connectDB() {
    if (mongoose.connections[0].readyState) return;

    await mongoose
        .connect(DB_URL_1)
        .catch((e) => {
            console.error("Error connecting to database.");
            throw e;
        });
};

