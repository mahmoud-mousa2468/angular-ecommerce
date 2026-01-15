import { Component, inject, Renderer2 } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss',
})
export class ForgetpasswordComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);
  private readonly _Renderer2 = inject(Renderer2);
  emailuser = '';
  userMsg = '';
  step1 = true;
  step2 = false;
  step3 = false;
  emailForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.email, Validators.required]],
  });
  verifyCodeForm: FormGroup = this._FormBuilder.group({
    resetCode: [null, [Validators.required]],
  });
  resetPasswordForm: FormGroup = this._FormBuilder.group({
    newPassword: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
  });
  emailfun(e: HTMLButtonElement): void {
    this._Renderer2.setAttribute(e, 'disabled', 'true');
    let formData = this.emailForm.value;
    this.emailuser = formData.email;
    this._AuthService.forgotPassword(formData).subscribe({
      next: (res) => {
        this.userMsg = res.message;
        this.step1 = false;
        this.step2 = true;
      },
    });
  }
  verifyCodefun(e: HTMLButtonElement): void {
    this._Renderer2.setAttribute(e, 'disabled', 'true');
    this._AuthService.verifyResetCode(this.verifyCodeForm.value).subscribe({
      next: (res) => {
        this.step2 = false;
        this.step3 = true;
        this.userMsg = res.status;
        this._Renderer2.removeAttribute(e, 'disabled');
      },
    });
  }
  resetPasswordfun(e: HTMLButtonElement): void {
    this._Renderer2.setAttribute(e, 'disabled', 'true');
    let formData = this.resetPasswordForm.value;
    formData.email = this.emailuser;
    this._AuthService.resetPassword(formData).subscribe({
      next: (res) => {
        if (res.token) {
          localStorage.setItem('userToken', res.token);
          this._Router.navigate(['/home']);
          this._Renderer2.removeAttribute(e, 'disabled');
        }
      },
    });
  }
}
