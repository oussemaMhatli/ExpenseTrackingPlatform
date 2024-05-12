import { Types } from "mongoose";
import { Tag } from "src/tag/entities/tag.entity";

export class Transaction {
    montant: number;
    date: Date;
    description: string;
    userId: string;
    tags: Types.ObjectId[];
    categorie: string;


}
