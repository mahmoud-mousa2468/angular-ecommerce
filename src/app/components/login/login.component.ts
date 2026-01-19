import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isloading: boolean = false;
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);

  loginForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [
      null,
      [Validators.required, Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)],
    ],
  });
  handleForm(): void {
    this.isloading = true;
    if (this.loginForm.valid) {
      let userData = this.loginForm.value;
      this._AuthService.signIn(userData).subscribe({
        next: (res) => {
          if (res.message == 'success') {
            this.isloading = false;
            localStorage.setItem('uToken', res.token);
            this._Router.navigate(['/home']);
          }
        },
      });
    }
  }
}
