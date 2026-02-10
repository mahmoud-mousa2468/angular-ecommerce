import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {
private readonly _TranslateService = inject(TranslateService);
  private readonly _PlatId = inject(PLATFORM_ID);
  private readonly _Renderer2 = inject(RendererFactory2).createRenderer(null, null);

  constructor() {
    if (isPlatformBrowser(this._PlatId)) {
      // 1. تحميل اللغة المحفوظة أو الافتراضية
      const savedLang = localStorage.getItem('lang');
      
      if (savedLang) {
        this._TranslateService.use(savedLang);
        this.changeDirection(savedLang);
      } else {
        this._TranslateService.setDefaultLang('en');
        this.changeDirection('en');
      }
    }
  }
  changeLang(lang: string): void {
    if (isPlatformBrowser(this._PlatId)) {
      localStorage.setItem('lang', lang);
    }
    this._TranslateService.use(lang);
    this.changeDirection(lang);
  }
  changeDirection(lang: string): void {
    if (lang === 'en') {
      this._Renderer2.setAttribute(document.documentElement, 'dir', 'ltr');
      this._Renderer2.setAttribute(document.documentElement, 'lang', 'en');
    } else if (lang === 'ar') {
      this._Renderer2.setAttribute(document.documentElement, 'dir', 'rtl');
      this._Renderer2.setAttribute(document.documentElement, 'lang', 'ar');
    }
  }
}
