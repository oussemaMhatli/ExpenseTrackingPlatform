import { Schema, Types } from 'mongoose';

export const TagSchema = new Schema({
    name: String,
  date: { type: Date, default: Date.now() },

});