/* eslint-disable prettier/prettier */
import { Schema } from 'mongoose';

export const  budgetSchema=new Schema({
    
    montant: Number,
    namebudget:String,
    //dateDebut: Date,
    //dateFin: Date,
    userId: { type: Schema.Types.ObjectId, ref: 'User' } ,// Reference to the User schema

})
