import { Schema, Types } from 'mongoose';

export const TransactionSchema = new Schema({
    montant: Number,
    categorie: String,
    description: String,
  date: { type: Date, default: Date.now() },
});

