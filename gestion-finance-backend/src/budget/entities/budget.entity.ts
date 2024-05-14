/* eslint-disable prettier/prettier */

import { Types } from "mongoose";

export class Budget {
    montant: number;
    namebudget:string
    //datedeb: Date;
    //datefin: Date;
    user: Types.ObjectId[];
}
