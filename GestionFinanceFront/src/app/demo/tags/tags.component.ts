/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component, ViewChild } from '@angular/core';
import { ServiceTagsService } from '../services/service-tags.service';
import { Tags } from '../user-management/components/modeles/Tags';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent {
  @ViewChild('f') form!: NgForm;

  tabletags:Tags[]=[]
  newtag!:Tags

  constructor(private servicetag:ServiceTagsService){}
  ngOnInit():void{
    this.getAllTags()
    }

  getAllTags(){
     this.servicetag.getAllTags().subscribe({
      next:(data:Tags[])=>{
        this.tabletags=data;
        console.log("tous les tags:",this.tabletags);

      }
    })

  }



  addtag(tag:Tags){
    if (!this.form.value.name) {
      alert('Le champ nom du tag est vide');

    }
    else{
      console.log('Nom du tag:', this.form.value.name);

    this.servicetag.addtag(tag).subscribe({
      next:(res)=>{
        alert('ajouté avec succés')
        this.ngOnInit()

      },
      error:(err)=>{
        alert('erreur d\'ajout'+JSON.stringify(err))

      },
      complete:()=>{
        console.log("complited observable add");

      }
    })

    }



  }


  deletetag(id:string){
    const confirmation = window.confirm('Voulez-vous supprimer ce tag?');
    if (confirmation) {
      this.servicetag.deletetag(id).subscribe({
        next:(res)=>{
          alert('supprimé avec succès',);

          this.ngOnInit()
        },
        error:(err)=>{
          alert('Erreur de suppression '+ JSON.stringify(err));
        }
      })

  }
}



}
