import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services';
import { Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,TranslateModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  isloading: boolean = false;
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  private destroyRef = inject(DestroyRef)
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
      this._AuthService.signUp(userData).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
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
