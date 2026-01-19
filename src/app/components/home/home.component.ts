import { Component, inject, Renderer2 } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Icategory } from '../../core/interfaces/icategory';
import { Iproduct } from '../../core/interfaces/iproduct';
import { CartService } from '../../core/services/cart.service';
import { CategoryService } from '../../core/services/category.service';
import { ProductService } from '../../core/services/product.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { NgStyle, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CuttextPipe } from '../../core/pipes/cuttext.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    SearchPipe,
    CuttextPipe,
    CarouselModule,
    NgStyle,
    CurrencyPipe,
    FormsModule,
  ],

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  term: string = '';
  categories: Icategory[] = [];
  products: Iproduct[] = [];
  wishList: string[] = [];
  private readonly _ProductService = inject(ProductService);
  // Renderer2 has the method that can access DOM
  private readonly _Renderer2 = inject(Renderer2);
  private readonly _CartService = inject(CartService);
  private readonly _CategoryService = inject(CategoryService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _WishlistService = inject(WishlistService);

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
    navText: ['prev', 'next'],
    items: 1,
    nav: true,
  };
  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 7000,
    autoplaySpeed: 1000,
    navSpeed: 700,
    navText: ['prev', 'next'],
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
    nav: true,
  };
  ngOnInit(): void {
    this._ProductService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.data;
      },
    });
    this._CategoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
    });
    this._WishlistService.getAllWishlist().subscribe({
      next: (res) => {
        console.log(res.data);
        this.wishList = res.data.map((term: any) => term._id);
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
      },
    });
  }
  addtocart(id: any, element: HTMLButtonElement): void {
    this._Renderer2.setAttribute(element, 'disabled', 'true');
    this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log('kkkkkk');
        if (res.status == 'success') {
          this._CartService.cartNum.next(res.numOfCartItems);
          this._ToastrService.success(res.message, 'Fresh Cart');
          this._Renderer2.removeAttribute(element, 'disabled');
        }
      },
    });
  }
  getStarBackground(filledFraction: number): string {
    // Generate the linear gradient: a percentage of gold and the rest transparent
    return `linear-gradient(to right, gold ${filledFraction * 100}%, gray ${filledFraction * 100}%)`;
  }
}
