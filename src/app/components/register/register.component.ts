import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  isloading: boolean = false;
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  registerForm: FormGroup = this._FormBuilder.group({
    name: [
      null,
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    email: [null, [Validators.required, Validators.email]],
    password: [
      null,
      [
        Validators.required,
        RxwebValidators.pattern({
          expression: { password: /^[a-zA-Z0-9_@]{6,}$/ },
        }),
      ],
    ],
    rePassword: [
      null,
      [Validators.required, RxwebValidators.compare({ fieldName: 'password' })],
    ],
    phone: [
      null,
      [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
    ],
  });
  handleForm(): void {
    this.isloading = true;
    if (this.registerForm.valid) {
      let userData = this.registerForm.value;
      this._AuthService.signUp(userData).subscribe({
        next: (res) => {
          if (res.message == 'success') {
            this.isloading = false;
            this._Router.navigate(['/login']);
          }
        },
      });
    }
  }
}
