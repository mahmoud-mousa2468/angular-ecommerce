import {
  Component,
  DestroyRef,
  HostListener,
  inject
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  CartService,
  MyTranslateService,
  WishlistService,
} from '../../core/services';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss',
})
export class NavBlankComponent  {
  private readonly _Router = inject(Router);
  readonly _CartService = inject(CartService);
  readonly _WishlistService = inject(WishlistService);
  private destroyRef = inject(DestroyRef);
  isScrolled = false;

  readonly _MyTranslateService = inject(MyTranslateService);
  readonly _TranslateService = inject(TranslateService); // 1. بنحقن دي عشان نعرف اللغة الحالية
  // 2. دالة التغيير الجديدة (Toggle)
  changeLanguage(): void {
    const currentLang = this._TranslateService.getCurrentLang(); // بنجيب اللغة الحالية
    const newLang = currentLang === 'en' ? 'ar' : 'en'; // بنعكسها

    this._MyTranslateService.changeLang(newLang); // بننفذ التغيير
  }
  
  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 30;
  }
  signOut(): void {
    localStorage.removeItem('userToken');
    this._Router.navigate(['/login']);
  }
}
