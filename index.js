import mongoose from 'mongoose';

export default async function connectDB() {
    if (mongoose.connections[0].readyState) return;

    await mongoose
        .connect(process.env.DATABASE_URI)
        .catch((e) => {
            console.error("Error connecting to database.");
            throw e;
        });
};

