import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css']
})
export class AccessComponent implements OnInit {

  hide = true;
  user: any = {};
  loading = false;

  constructor(private auth: AuthenticationService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  public async onSubmitRegister(form: NgForm) {
    if (form.invalid) { this.openSnackBar('Llena todos los campos'); return; }

    this.loading = true;
    this.user.firstName = this.user.firstName.trim();
    this.user.lastName = this.user.lastName.trim();
    this.user.email = this.user.email.trim();
    this.user.telephone = this.user.telephone.trim();

    try {
      await this.auth.signUp(this.user);
      this.router.navigateByUrl('/cms/home');
    } catch (error) {
      console.log(error);
      this.loading = false;
      this.openSnackBar('Hubo un error');
    }
  }

  public async onSubmitLogin(form: NgForm) {
    if (form.invalid) { return; }
    try {
      this.loading = true;
      await this.auth.signIn(this.user);
      this.router.navigateByUrl('/cms/home');
    } catch (error) {
      this.loading = false;
      console.log(error);
      this.openSnackBar('Credenciales inválidas');
    }
  }

  private openSnackBar(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }
}
