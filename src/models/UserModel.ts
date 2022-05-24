// const mongoose = require('mongoose');
import mongoose from 'mongoose'
const Schema = mongoose.Schema;

// import bcrypt from 'bcrypt';
import {hash} from 'bcrypt';


const UserSchema = new Schema({
    name: { type: String, required: true },
    user: { type: String, required: true, unique: true, lowercase: true },    
    password: { type: String, required: true, select: false },    
    created: {type: Date, default: Date.now}
});

UserSchema.pre('save', async function (next) {
    let user = this;
    if (!user.isModified('password')) return next();

    user.password = await hash(user.password, 10);
    return next();
});

export default mongoose.model('User', UserSchema);