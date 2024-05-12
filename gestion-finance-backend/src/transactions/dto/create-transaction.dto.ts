import { Types } from "mongoose";
import { Tag } from "src/tag/entities/tag.entity";

export class CreateTransactionDto {
    montant: number;
    categorie: string;
    description: string;
    userId: string;
    tags: Types.ObjectId[];
}
