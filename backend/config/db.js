import mongoose from "mongoose";

mongoose.set('strictQuery', false);

const connectDB = () => {
    try{
        const conn = mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('MongoDB Database connected');

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

export default connectDB;