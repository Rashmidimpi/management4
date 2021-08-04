import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {

  productform: FormGroup | any;

  constructor( public fb: FormBuilder, private router: Router) {
    this.productform = this.fb.group({
      product_name: ['', Validators.required],
      seller: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required]
    

    })
   }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.productform.value);
    this.productform.value;
    this.router.navigate(['/products']);
  }

  onReset(){
    this.productform.reset();
    this.router.navigate(['/products']);
  }

}
