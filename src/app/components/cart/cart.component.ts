import { DecimalPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Icart } from '../../core/interfaces';
import { CartService } from '../../core/services';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, DecimalPipe,TranslateModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private readonly _CartService = inject(CartService);
  private destroyRef = inject(DestroyRef);
  cart = {} as Icart;
  isLoading = false; // to controll disable buttons while loading
  // variables to make same Modal use for clear and remove
  modalTitle = '';
  modalBody = '';
  btnName = '';
  // variable to run clickedFun based on param value
  param: string |null = null;
  ngOnInit(): void {
    this._CartService
      .getLoggedUserCart()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.cart = res.data;
        },
      });
  }
  // function will fire when i click clear or remove button and based on param value then change on Modal variables to make it suitable
  setParamFun(param: string |null) {
    this.param = param;
    if (this.param === null) {
      this.modalTitle = 'MODAL.CLEAR_TITLE';
      this.modalBody = 'MODAL.CLEAR_BODY';
      this.btnName = 'MODAL.CONFIRM_CLEAR';
      return
    } else {
      this.modalTitle = 'MODAL.REMOVE_TITLE';
      this.modalBody = 'MODAL.REMOVE_BODY';
      this.btnName = 'MODAL.CONFIRM_REMOVE';
    }
  }
  // function will fire when i click Model button action
  clickedFun() {
    if (this.param === null) {
      this.clearCart();
      return;
    } else {
      this.Remove(this.param);
    }
  }
  clearCart(): void {
    this._CartService
      .clearUserCart()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.cart = {} as Icart;
          this.modalTitle = 'clear cart';
          this.modalBody = 'you gonna remove all items from cart';
        },
      });
  }
  Remove(id: any): void {
    this._CartService
      .removeSpecificCartItem(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.cart = res.data;
        },
      });
  }
  changeCount(id: any, count: number): void {
    this.isLoading = true;
    this._CartService
      .updateCartProductQuantity(id, count)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.cart = res.data;
          this.isLoading = false;
        },
      });
  }
}
