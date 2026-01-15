import { Component, inject, OnInit, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Iproduct } from '../../core/interfaces/iproduct';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { NgStyle, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CuttextPipe } from '../../core/pipes/cuttext.pipe';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterLink, NgStyle, CuttextPipe, CurrencyPipe],

  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit {
  products: Iproduct[] = [];
  private readonly _Renderer2 = inject(Renderer2);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _WishlistService = inject(WishlistService);
  wishList: string[] = [];
  ngOnInit(): void {
    this._WishlistService.getAllWishlist().subscribe({
      next: (res) => {
        this.products = res.data;
      },
    });
    this._WishlistService.getAllWishlist().subscribe({
      next: (res) => {
        // map convert data structure from array of object to array of string (to get id in array structure)
        this.wishList = res.data.map((term: any) => term._id);
      },
    });
  }
  addtocart(id: any, element: HTMLButtonElement): void {
    this._Renderer2.setAttribute(element, 'disabled', 'true');
    this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
        if (res.status == 'success') {
          this._CartService.cartNum.next(res.numOfCartItems);
          this._ToastrService.success(res.message, 'Fresh Cart');
          this._Renderer2.removeAttribute(element, 'disabled');
        }
      },
    });
  }
  addToWishList(prodId: any): void {
    this._WishlistService.addProductToWishlist(prodId).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
        this.wishList = res.data;
        this._WishlistService.productsWishListNum.next(res.data.length);
      },
    });
  }
  removeFromWishList(prodId: any): void {
    this._WishlistService.removeFromWishlist(prodId).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
        this.wishList = res.data;
        this._WishlistService.productsWishListNum.next(res.data.length);
        const newProductsData = this.products.filter((product: any) =>
          this.wishList.includes(product._id)
        );
        this.products = newProductsData;
      },
    });
  }
  getStarBackground(filledFraction: number): string {
    // Generate the linear gradient: a percentage of gold and the rest transparent
    return `linear-gradient(to right, gold ${filledFraction * 100}%, gray ${
      filledFraction * 100
    }%)`;
  }
}
