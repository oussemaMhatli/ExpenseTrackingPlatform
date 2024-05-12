export class transaction{
      public _id!:string;
  //     private _date:Date;


  public montant!: number;
  public categorie!: string;
  public description!: string;
  public date!: Date;
  public userId!:string

  constructor(montant: number, categorie: string, description: string, date: Date,userId:string) {
    this.montant = montant;
    this.categorie = categorie;
    this.description = description;
    this.date = date;
    this.userId=userId
  }

}
