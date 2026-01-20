import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icart } from '../../core/interfaces/icart';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
    imports: [RouterLink, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private readonly _CartService = inject(CartService)
  private readonly _Renderer2 = inject(Renderer2)
  cart = {} as Icart;
  // variables to make same Modal use for clear and remove
  modalTitle = ""
  modalBody = ""
  btnName = ""
  // variable to run clickedFun based on param value
  param: any
  ngOnInit(): void {
    this._CartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cart = res.data;
      }
    })
  }
  // function will fire when i click clear or remove button and based on param value then change on Modal variables to make it suitable 
  setParamFun(param: any) {
    this.param = param
    if (this.param == 1) {
      this.modalTitle = "clear item"
      this.modalBody = "you will empty all your cart"
      this.btnName = "clear"
    } else {
      this.modalTitle = "remove item"
      this.modalBody = "you will remove the item from your cart"
      this.btnName = "remove"
    }
  }
  // function will fire when i click Model button action
  clickedFun() {
    if (this.param == 1) {
      this.clearCart()
    } else {
      this.Remove(this.param)
    }
  }
  clearCart(): void {
    this._CartService.clearUserCart().subscribe({
      next: (res) => {
        this.cart = {} as Icart
        this._CartService.cartNum.next(0)
        this.modalTitle = "clear cart"
        this.modalBody = "you gonna remove all items from cart"
      }
    })
  }
  Remove(id: any): void {
    this._CartService.removeSpecificCartItem(id).subscribe({
      next: (res) => {
        this.cart = res.data;
        this._CartService.cartNum.next(res.numOfCartItems)
      }
    })
  }
  changeCount(id: any, count: number, el1: HTMLButtonElement, el2: HTMLButtonElement): void {
    this._Renderer2.setAttribute(el1, 'disabled', 'true');
    this._Renderer2.setAttribute(el2, 'disabled', 'true');
    this._CartService.updateCartProductQuantity(id, count).subscribe({
      next: (res) => {
        this.cart = res.data;
        this._Renderer2.removeAttribute(el1, 'disabled')
        this._Renderer2.removeAttribute(el2, 'disabled')
        if (count == 0) {
          this._CartService.cartNum.next(res.numOfCartItems)
        }
      }
    })
  }
}
