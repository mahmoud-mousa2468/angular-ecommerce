import { CurrencyPipe, DecimalPipe, NgStyle } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  OnInit
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Iproduct } from '../../core/interfaces';
import { CuttextPipe } from '../../core/pipes/cuttext.pipe';
import { CartService,WishlistService } from '../../core/services';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterLink, NgStyle, CuttextPipe,DecimalPipe,TranslateModule],

  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit {
  products: Iproduct[] = [];
  isLoading = false; // to controll disable buttons while loading
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  readonly _WishlistService = inject(WishlistService);
  private destroyRef = inject(DestroyRef);
  wishList: string[] = [];
  ngOnInit(): void {
    this._WishlistService
      .getAllWishlist()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.products = res.data;
        },
      });
  }
  addtocart(id: any): void {
    this.isLoading = true;
    this._CartService
      .addProductToCart(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if (res.status == 'success') {
            this._ToastrService.success(res.message, 'Fresh Cart');
            this.isLoading = false;
          }
        },
      });
  }
  addToWishList(prodId: any): void {
    this._WishlistService
      .addProductToWishlist(prodId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this._ToastrService.success(res.message);
        },
      });
  }
  removeFromWishList(prodId: any): void {
    this._WishlistService
      .removeFromWishlist(prodId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this._ToastrService.success(res.message);
          const newProductsData = this.products.filter((product: any) =>
            this._WishlistService.wishlistData().includes(product._id)
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
