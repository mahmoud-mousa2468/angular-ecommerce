import { Component, inject, OnInit } from '@angular/core';
import { Ibrands } from '../../core/interfaces/ibrand';
import { BrandService } from '../../core/services/brand.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  private readonly _BrandService = inject(BrandService);
  brandsData: Ibrands[] = [];
  ngOnInit(): void {
    this._BrandService.getAllBrands().subscribe({
      next: (res) => {
        this.brandsData = res.data;
      },
    });
  }
}
