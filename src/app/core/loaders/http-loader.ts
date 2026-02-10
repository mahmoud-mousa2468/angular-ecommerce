import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';

export class CustomHttpLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    // هنا بنحدد مسار ملفات الترجمة يدوياً وخلاص
    return this.http.get(`./assets/i18n/${lang}.json`);
  }
}

// دالة المصنع اللي هنستخدمها في الكونفيج
export function httpLoaderFactory(http: HttpClient) {
  return new CustomHttpLoader(http);
}
