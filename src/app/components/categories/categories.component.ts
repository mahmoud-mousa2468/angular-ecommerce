import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icategory } from '../../core/interfaces/icategory';
import { CategoryService } from '../../core/services/category.service';

@Component({
  selector: 'app-categories',
  standalone: true,
   imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
private readonly _CategoriesService=inject(CategoryService)
  categoriesData:Icategory[]=[]
  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.categoriesData=res.data
      }
    })
  }
}
