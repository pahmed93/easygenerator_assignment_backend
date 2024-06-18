import {Schema, Document } from 'mongoose';

export interface User extends Document {
    email: string,
    name: string,
    password: string,
}

export const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});