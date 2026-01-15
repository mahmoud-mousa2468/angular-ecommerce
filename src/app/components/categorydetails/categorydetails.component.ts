import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../core/services/category.service';

@Component({
  selector: 'app-categorydetails',
  standalone: true,
  imports: [],
  templateUrl: './categorydetails.component.html',
  styleUrl: './categorydetails.component.scss'
})
export class CategorydetailsComponent implements OnInit {
  categoryId: any
  categorydetails:any
  private readonly _CategoryService = inject(CategoryService)
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        this.categoryId = p.get('id');
        this._CategoryService.getSpecificCategory(this.categoryId).subscribe({
          next: (res) => {
            this.categorydetails = res.data
          }
        })
      }
    })
  }
}
