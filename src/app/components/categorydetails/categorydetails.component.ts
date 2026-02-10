import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Icategory } from '../../core/interfaces';
import { CategoryService } from '../../core/services';
@Component({
  selector: 'app-categorydetails',
  standalone: true,
  imports: [],
  templateUrl: './categorydetails.component.html',
  styleUrl: './categorydetails.component.scss',
})
export class CategorydetailsComponent implements OnInit {
  categoryId: string | null = null;
  categorydetails: Icategory[] | null = null;
  private readonly _CategoryService = inject(CategoryService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        this.categoryId = p.get('id');
        this._CategoryService
          .getSpecificCategory(this.categoryId)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: (res) => {
              this.categorydetails = res.data;
            },
          });
      },
    });
  }
}
