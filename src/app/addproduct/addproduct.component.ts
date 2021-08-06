import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApihandlerService } from 'src/app/shared/apihandler.service';
import Swal from 'sweetalert2';
import { config } from 'rxjs';


@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {

  productform: FormGroup | any;

  constructor( public fb: FormBuilder, private router: Router, private route: ActivatedRoute, private apiService: ApihandlerService) {
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
    
    let url = 'product';
    let apidata = this.productform.value;
    console.log('apidata :: ', apidata);

    this.apiService.postrequest(url, apidata).subscribe(response => {
      console.log(response);
    })
    this.router.navigate(['/products']);
  }

  onReset(){
    this.productform.reset();
    this.router.navigate(['/products']);
  }

}
