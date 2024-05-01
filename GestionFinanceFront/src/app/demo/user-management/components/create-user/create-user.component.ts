import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importez Router
import { UserService } from '../services/user.service';
import { User } from '../modeles/user.model'; // Assurez-vous que le chemin d'accès est correct
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  user: User = {
    id: '',
    name: '',
    email: '',
    password: '',
    location:'',
    poste:''

  };
  form!: FormGroup;
  constructor(private userService: UserService, private router: Router,  private fb: FormBuilder,
    private toastr: ToastrService,) { } // Injectez Router ici


    ngOnInit(): void {
      this.form = this.fb.group({
        email: ["", [Validators.required, Validators.email]], // Initialize email with an empty string
        name: ["", [Validators.required]], // Initialize name with an empty string
        poste: ["", [Validators.required]], // Initialize poste with an empty string
        password: ["", [Validators.required]], // Initialize password with an empty string
        location: ["", [Validators.required]], // Initialize location with an empty string
      });    }
  onSubmit(): void {
    console.log(this.form.value)

      this.userService.createUser(this.form.value).subscribe(res=>{
        this.toastr.success("User Created successfully !", 'success');
        this.router.navigate(['user/users-list']);

      },error=>{
        this.toastr.error("Server Error !", 'error');

      })
  }

  // Méthode pour générer un mot de passe aléatoire
  private generatePassword(): string {
    const length = 8;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }

  submitEdit() {
    // Ajoutez ici la logique pour soumettre les modifications de l'utilisateur
    console.log('Modifications soumises : ', this.user);
  }
  submitForm(): void {
    // Votre logique de soumission de formulaire ici
  }
}
