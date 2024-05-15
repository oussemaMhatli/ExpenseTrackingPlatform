export class Budget
{

  public _id!:string;
  public namebudget!: string;
  public montant!: number;
  //public dateDebut!: Date;
  public dateFin!: Date;
  public userId!:string;

  constructor( namebudget: string, montant: number,  userId:string,dateFin:Date)
  {
    this.namebudget = namebudget;
    this.montant = montant;
    this.dateFin=dateFin
    this.userId=userId;
  }

}
