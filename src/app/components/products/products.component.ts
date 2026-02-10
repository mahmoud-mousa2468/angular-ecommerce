import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { Iproduct } from '../../core/interfaces';
import { CuttextPipe } from '../../core/pipes/cuttext.pipe';
import { CartService,ProductService,WishlistService } from '../../core/services';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  standalone: true,
    imports: [RouterLink, CuttextPipe, CurrencyPipe, NgxPaginationModule,TranslateModule,DecimalPipe],

  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements  OnInit {
  products: Iproduct[] = [];
  pageSize: number = 0;
  currentPage: number = 0;
  total: number = 0;
  wishList: string[] = []
  isLoading = false;  // to controll disable buttons while loading
  private readonly _ProductService = inject(ProductService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _WishlistService = inject(WishlistService)
private destroyRef = inject(DestroyRef)
  ngOnInit(): void {
    this._ProductService.getAllProducts().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.products = res.data
        this.pageSize = res.metadata?.limit || 0
        this.currentPage = res.metadata?.currentPage || 0
        this.total = res.results || 0
      }
    })
    this._WishlistService.getAllWishlist().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.wishList = res.data.map((term: any) => term._id)
      }
    })
  }
  addtocart(id: any): void {
    this.isLoading = true
    this._CartService.addProductToCart(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        if (res.status == 'success') {
          this._ToastrService.success(res.message, 'Fresh Cart')
          this.isLoading = false
        }
      }
    })
  }
  addToWishList(prodId: any): void {
    this._WishlistService.addProductToWishlist(prodId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message)
        this.wishList = res.data
      }
    })
  }
  removeFromWishList(prodId: any): void {
    this._WishlistService.removeFromWishlist(prodId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message)
        this.wishList = res.data
      }
    })
  }
  pageChanged(e: any): void {
    this._ProductService.getAllProducts(e).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.products = res.data
        this.pageSize = res.metadata?.limit || 0
        this.currentPage = e
        this.total = res.results || 0
      }
    })
  }
}
