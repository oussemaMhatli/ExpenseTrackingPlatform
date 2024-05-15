/* eslint-disable prettier/prettier */

import { Types } from "mongoose";

export class Budget {
    montant: number;
    namebudget:string
    dateFin: Date;
    user: Types.ObjectId[];
}
