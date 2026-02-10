import { CurrencyPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService,ProductService } from '../../core/services';

@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [CarouselModule,CurrencyPipe],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.scss'
})
export class ProductdetailsComponent implements OnInit {
private readonly _ActivatedRoute =inject(ActivatedRoute)
private readonly _ProductService=inject(ProductService)
private readonly _CartService=inject(CartService)
private readonly _ToastrService=inject(ToastrService)
private destroyRef = inject(DestroyRef)
isLoading=false
Productid:any;
productData:any=null
productCarousel: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true
  }
ngOnInit(): void {
  this._ActivatedRoute.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
next:(p)=>{
this.Productid=p.get('id');
  this._ProductService.getspecificProduct(this.Productid).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
    next:(res)=>{
      console.log(res.data);
      this.productData=res.data
    },error:(err)=>{
      console.log(err)
    }
  })
}
  })
}
addToCart(id:any):void{
  this.isLoading=true
    this._CartService.addProductToCart(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next:(res)=>{
        if(res.status=='success'){
          this._ToastrService.success(res.message,'Fresh Cart')
          this.isLoading=false
        }
      }
    })
  }
}
