import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApihandlerService } from '../shared/apihandler.service';
import Swal from 'sweetalert2';


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

  constructor( public fb: FormBuilder, private router: Router, private route: ActivatedRoute, private apiService: ApihandlerService) {
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
      this.getProductById(this.id);
    });
  }

  getProductById(id: any){
    let apidata = {
      id:id
    }
    let url = 'product';
    this.apiService.postrequest(url, apidata).subscribe(response => {
      console.log(response);
      this.createForm(response[0]);
      this.detailsloaded = true;
      this.isEditable = false;
      
    })
  }


  onReset(){
    this.editproductform.reset();
  }

  createForm(item: any){
     this.editproductform = this.fb.group({
       id: [item.id],
       product_name: [item.product_name],
       seller: [item.seller],
       description: [item.description],
       price: [item.price]
     });
     this.editproductform.get('id').disable();
  }

  onSubmit(){
    console.log(this.editproductform.value);
    let data = {
      id: this.id,
      
    };
    this.apiService.updaterequest('product/', this.id, data).subscribe(
      (data) => {
        // alert("user updated");
        this.openSwal('data updated', 'success');
      },
      (error) => {
        console.log(error);
        this.openSwal('Something went wrong', 'error');
      })

  }

  openSwal(title: any, icon: any) {

    Swal.fire({
      title: title,
      icon: icon,
      showDenyButton: false,
      showCancelButton: false,
      confirmButtonText: `Ok`,
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
      } else if (result.isDenied) {

      }
    })
  }


}



