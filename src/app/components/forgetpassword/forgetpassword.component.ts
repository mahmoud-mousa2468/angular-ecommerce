import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule,TranslateModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss',
})
export class ForgetpasswordComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);
  isLoading = false;
  private destroyRef = inject(DestroyRef);
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
  emailfun(): void {
    this.isLoading = true;
    let formData = this.emailForm.value;
    this.emailuser = formData.email;
    this._AuthService
      .forgotPassword(formData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.userMsg = res.message ?? '';
          this.step1 = false;
          this.step2 = true;
          this.isLoading = false;
        },
      });
  }
  verifyCodefun(): void {
    this.isLoading = true;
    this._AuthService
      .verifyResetCode(this.verifyCodeForm.value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.step2 = false;
          this.step3 = true;
          this.userMsg = res.status??'';
          this.isLoading = false;
        },
      });
  }
  resetPasswordfun(): void {
    this.isLoading = true;
    let formData = this.resetPasswordForm.value;
    formData.email = this.emailuser;
    this._AuthService
      .resetPassword(formData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if (res.token) {
            this._Router.navigate(['/login']);
            this.isLoading = false;
          }
        },
      });
  }
}
