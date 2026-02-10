import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icategory } from '../../core/interfaces';
import { CategoryService } from '../../core/services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-categories',
  standalone: true,
   imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
private readonly _CategoriesService=inject(CategoryService)
  categoriesData:Icategory[]=[]
  private destroyRef = inject(DestroyRef)
  ngOnInit(): void {
    this._CategoriesService.getAllCategories().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next:(res)=>{
        this.categoriesData=res.data
      }
    })
  }
}
