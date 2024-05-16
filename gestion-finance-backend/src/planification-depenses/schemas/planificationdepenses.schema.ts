/* eslint-disable prettier/prettier */
import { Schema } from "mongoose";

export const PlanificationDepense = new Schema({
    categoriedepense:String,
    montant :Number,
    datePrevue:Date,
    statut:String




})  ;