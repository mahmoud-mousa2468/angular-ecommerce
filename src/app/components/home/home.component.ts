import { DecimalPipe, NgStyle } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Icategory, Iproduct } from '../../core/interfaces';
import { CuttextPipe } from '../../core/pipes/cuttext.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CartService, CategoryService, ProductService, WishlistService } from '../../core/services';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    SearchPipe,
    CuttextPipe,
    CarouselModule,
    NgStyle,
    // pipe response for number formatting
    DecimalPipe,
    FormsModule,
    TranslateModule
  ],

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  term: string = '';
  categories: Icategory[] = [];
  products: Iproduct[] = [];
  // wishList: string[] = [];
  isLoading = false;
  private readonly _ProductService = inject(ProductService);
  private readonly _CartService = inject(CartService);
  private readonly _CategoryService = inject(CategoryService);
  private readonly _ToastrService = inject(ToastrService);
  readonly _WishlistService = inject(WishlistService);
  private destroyRef = inject(DestroyRef)
  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplaySpeed: 1000,
    navSpeed: 700,
    items: 1,
    nav: false,
    rtl: true
  };
  categoryOptions: OwlOptions = {
    loop: true,
    rtl: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 7000,
    autoplaySpeed: 1000,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: false,
  };
  ngOnInit(): void {
    this._ProductService.getAllProducts().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.products = res.data;
      },
    });
    this._CategoryService.getAllCategories().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.categories = res.data;
      },
    });
  }
  addToWishList(prodId: any): void {
    this._WishlistService.addProductToWishlist(prodId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
      },
    });
  }
  removeFromWishList(prodId: any): void {
    this._WishlistService.removeFromWishlist(prodId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
      },
    });
  }
  addtocart(id: any): void {
    this.isLoading = true;
    this._CartService.addProductToCart(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        if (res.status == 'success') {
          this._ToastrService.success(res.message, 'Fresh Cart');
          this.isLoading = false;
        }
      },
    });
  }
  getStarBackground(filledFraction: number): string {
    // Generate the linear gradient: a percentage of gold and the rest transparent
    return `linear-gradient(to right, gold ${filledFraction * 100}%, gray ${filledFraction * 100}%)`;
  }
}
