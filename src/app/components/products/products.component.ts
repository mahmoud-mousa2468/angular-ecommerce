import { Component, inject, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Iproduct } from '../../core/interfaces/iproduct';
import { CartService } from '../../core/services/cart.service';
import { ProductService } from '../../core/services/product.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { CuttextPipe } from '../../core/pipes/cuttext.pipe';

@Component({
  selector: 'app-products',
  standalone: true,
    imports: [RouterLink, CuttextPipe, CurrencyPipe, NgxPaginationModule],

  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  products: Iproduct[] = [];
  pageSize: number = 0;
  currentPage: number = 0;
  total: number = 0;
  wishList: string[] = []
  private readonly _ProductService = inject(ProductService)
  // Renderer2 has the method that can access DOM
  private readonly _Renderer2 = inject(Renderer2)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _WishlistService = inject(WishlistService)

  ngOnInit(): void {
    this._ProductService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.data
        this.pageSize = res.metadata.limit
        this.currentPage = res.metadata.currentPage
        this.total = res.results
      }
    })
    this._WishlistService.getAllWishlist().subscribe({
      next: (res) => {
        this.wishList = res.data.map((term: any) => term._id)
      }
    })
  }
  addtocart(id: any, element: HTMLButtonElement): void {
    this._Renderer2.setAttribute(element, 'disabled', 'true')
    this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
        if (res.status == 'success') {
          this._CartService.cartNum.next(res.numOfCartItems);
          this._ToastrService.success(res.message, 'Fresh Cart')
          this._Renderer2.removeAttribute(element, 'disabled')
        }
      }
    })
  }
  addToWishList(prodId: any): void {
    this._WishlistService.addProductToWishlist(prodId).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message)
        this.wishList = res.data
        this._WishlistService.productsWishListNum.next(res.data.length);
      }
    })
  }
  removeFromWishList(prodId: any): void {
    this._WishlistService.removeFromWishlist(prodId).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message)
        this.wishList = res.data
        this._WishlistService.productsWishListNum.next(res.data.length);
      }
    })
  }
  pageChanged(e: any): void {
    this._ProductService.getAllProducts(e).subscribe({
      next: (res) => {
        this.products = res.data
        this.pageSize = res.metadata.limit
        this.currentPage = e
        this.total = res.results
      }
    })
  }
}
