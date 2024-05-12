/* eslint-disable prettier/prettier */
import { Schema } from 'mongoose';

export const UserSchema = new Schema({
    id:String,
    firstName: String,
    lastName:String,
    email: String,
    password : String,
});
