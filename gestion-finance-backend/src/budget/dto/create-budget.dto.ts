/* eslint-disable prettier/prettier */

import { Types } from "mongoose";

export class CreateBudgetDto {
    montant: number;
    namebudget:string
    dateFin: Date;
    user: Types.ObjectId[];
}
