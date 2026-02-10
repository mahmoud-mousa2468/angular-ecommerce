import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services';

@Component({
  selector: 'app-nav-auth',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,TranslateModule],
  templateUrl: './nav-auth.component.html',
  styleUrl: './nav-auth.component.scss'
})
export class NavAuthComponent {
 readonly _MyTranslateService = inject(MyTranslateService);
  readonly _TranslateService = inject(TranslateService); // 1. بنحقن دي عشان نعرف اللغة الحالية
  // 2. دالة التغيير الجديدة (Toggle)
  changeLanguage(): void {
    const currentLang = this._TranslateService.getCurrentLang(); // بنجيب اللغة الحالية
    const newLang = currentLang === 'en' ? 'ar' : 'en'; // بنعكسها

    this._MyTranslateService.changeLang(newLang); // بننفذ التغيير
  }
}
