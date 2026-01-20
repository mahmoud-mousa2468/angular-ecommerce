import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss',
})
export class NavBlankComponent implements OnInit {
  @ViewChild('navbar') navElement!: ElementRef;
  private readonly _Renderer2 = inject(Renderer2);
  @HostListener('window:scroll')
  onScroll(): void {
    if (scrollY > 500) {
      this._Renderer2.addClass(this.navElement.nativeElement, 'px-5');
      this._Renderer2.addClass(this.navElement.nativeElement, 'shadow');
    } else {
      this._Renderer2.removeClass(this.navElement.nativeElement, 'px-5');
      this._Renderer2.removeClass(this.navElement.nativeElement, 'shadow');
    }
  }
  cartNum: any;
  productsWishListNum: any;
  private readonly _Router = inject(Router);
  private readonly _CartService = inject(CartService);
  private readonly _WishlistService = inject(WishlistService);
  ngOnInit(): void {
    this._CartService.cartNum.subscribe({
      next: (res) => {
        this.cartNum = res;
      },
    });
    this._WishlistService.productsWishListNum.subscribe({
      next: (res) => {
        this.productsWishListNum = res;
      },
    });
    this._WishlistService.getAllWishlist().subscribe({
      next: (res) => {
        this.productsWishListNum = res.count;
      },
    });
    this._CartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartNum = res.numOfCartItems;
      },
    });
  }
  signOut(): void {
    localStorage.removeItem('userToken');
    this._Router.navigate(['/login']);
  }
}
