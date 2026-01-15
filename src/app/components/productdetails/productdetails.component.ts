import { Component, inject, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';
import { ProductService } from '../../core/services/product.service';
import { CurrencyPipe } from '@angular/common';

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
private readonly _Renderer2=inject(Renderer2)
private readonly _ToastrService=inject(ToastrService)
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
  this._ActivatedRoute.paramMap.subscribe({
next:(p)=>{
this.Productid=p.get('id');
  this._ProductService.getspecificProduct(this.Productid).subscribe({
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
addToCart(id:any,element:HTMLButtonElement):void{
    this._Renderer2.setAttribute(element,'disabled','true')
    this._CartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res)
        if(res.status=='success'){
          this._CartService.cartNum.next(res.numOfCartItems);
          this._ToastrService.success(res.message,'Fresh Cart')
          this._Renderer2.removeAttribute(element,'disabled')
        }
      },error:(err)=>{
        console.log(err)
        this._Renderer2.removeAttribute(element,'disabled')
      }
    })
  }
}
