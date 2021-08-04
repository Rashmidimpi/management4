import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.scss']
})
export class EditproductComponent implements OnInit {

  editproductform: FormGroup | any;
  @Input() id: any; ActivatedRoute: any
  item: any;
  isEditable = false;
  detailsloaded = false;

  constructor( public fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.editproductform = this.fb.group({
      id:['', Validators.required],
      product_name: ['', Validators.required],
      seller: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required]


    })
   }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      console.log(params);
      this.id = params.id;
      console.log("rashmi");
      console.log(this.id);
    });
  }

  onReset(){
    this.editproductform.reset();
  }

  onSubmit(){
    console.log(this.editproductform.value)
  }

}
