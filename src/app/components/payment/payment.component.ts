import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService,OrderService } from '../../core/services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _OrdersService = inject(OrderService);
  private readonly _CartService = inject(CartService);
  private readonly _Router = inject(Router);
  private destroyRef = inject(DestroyRef)
  id: any;
  ngOnInit(): void {
    this._CartService.getLoggedUserCart().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        if (res.data.totalCartPrice <= 0) {
          this._Router.navigate(['/cart']);
        }
      },
    });
    this._ActivatedRoute.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.id = res.get('id');
      },
    });
  }
  orderForm: FormGroup = this._FormBuilder.group({
    details: [null, [Validators.required]],
    phone: [
      null,
      [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
    ],
    city: [null, Validators.required],
  });
  handelForm(): void {
    this._OrdersService
      .checkOutSession(this.id, this.orderForm.value).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if (res.status == 'success') {
            // if success u will direct to https://checkout.stripe.com/ to enter Visa Info then allOrders component
            window.open(res.session?.url, '_self');
            this._CartService.cartNum.set(0);
          }
        },
      });
  }
}
