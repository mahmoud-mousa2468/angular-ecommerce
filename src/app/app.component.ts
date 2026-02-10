import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerComponent } from 'ngx-spinner';
import {
  CartService,
  MyTranslateService,
  WishlistService,
} from './core/services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly _CartService = inject(CartService);
  private readonly _WishlistService = inject(WishlistService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);
  ngOnInit(): void {
    if (isPlatformBrowser(this._PLATFORM_ID) && localStorage.getItem('userToken')) {
      this._CartService
        .getLoggedUserCart()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (res) => {
            this._CartService.cartNum.set(res?.numOfCartItems ?? 0);
          },
        });
      this._WishlistService
        .getAllWishlist()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe();
    }
  }
  title = 'angular-ecommerce';
  private readonly _MyTranslateService = inject(MyTranslateService);
}
