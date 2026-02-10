import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Ibrand } from '../../core/interfaces';
import { BrandService } from '../../core/services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DecimalPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [DecimalPipe,TranslateModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  private readonly _BrandService = inject(BrandService);
  brandsData: Ibrand[] = [];
  private destroyRef = inject(DestroyRef);
  ngOnInit(): void {
    this._BrandService
      .getAllBrands()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.brandsData = res.data;
        },
      });
  }
}
