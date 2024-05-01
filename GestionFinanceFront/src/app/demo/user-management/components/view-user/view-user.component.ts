import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../modeles/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {
  user: User | undefined;
  userId:string=""
  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private router:Router,
    private toastr: ToastrService,public dialog: MatDialog) { }

  ngOnInit(): void {
     this.userId = this.route.snapshot.params['id'];
 this.getuser();
  }

  editUser(userId: string): void {
    this.router.navigate(['user/edit-user', userId]);
  }
getuser(){
  this.userService. getUserById(this.userId).subscribe(
    (user: User) => {
      this.user = user;
    },
    (error: any) => {
      console.error(error);
    }
  );
}
  deleteUser(userId: string): void {
    this.userService.deleteUser(userId).subscribe(res=>{
    this.user=undefined
      this.toastr.success("Suppression effectuée !", 'success');

    })  }
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

}
