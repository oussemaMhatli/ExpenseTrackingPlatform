export class transaction{
  //    private _id:number;
  //     private _date:Date;


  public montant!: number;
  public categorie!: string;
  public description!: string;
  public date!: Date;

  constructor(montant: number, categorie: string, description: string, date: Date) {
    this.montant = montant;
    this.categorie = categorie;
    this.description = description;
    this.date = date;
  }

}
