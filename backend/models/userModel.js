import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'Pleaase add a first name']
    },
    lastName: {
        type: String,
        required: [true, 'Pleaase add a last name']
    },
    email: {
        type: String,
        required: [true, 'Please add email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema);

export default User;