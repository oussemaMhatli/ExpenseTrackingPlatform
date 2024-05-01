import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { User } from '../modeles/user.model';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  usersList!: User[] ;
  constructor(public dialog: MatDialog,private userService: UserService, private toastr: ToastrService,private router:Router) {}
  ngOnInit(): void {
    this.getllUser();

  }
  onDeleteClick(id:any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: 'Voulez-vous vraiment supprimer cet utilisateur ?' }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Mettez ici votre logique de suppression
        console.log('Suppression effectuée !');
        this.deleteUser(id)
      } else {
        console.log('Suppression annulée.');
      }
    });
  }
  getllUser(){
   this.userService.getUsers().subscribe(res=>{
    this.usersList=res;
   })
  }
  deleteUser(id:string){
this.userService.deleteUser(id).subscribe(res=>{
  this.getllUser();
  this.toastr.success("Suppression effectuée !", 'success');

})
  }
  details(id:string){
    this.router.navigate(['user/view-user', id]);
  }
}
