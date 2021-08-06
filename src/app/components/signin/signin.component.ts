import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApihandlerService } from 'src/app/shared/apihandler.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  errors = null;
  submitted = false;


  constructor(private apiService: ApihandlerService, public router: Router, public fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['',[Validators.required, ,Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]], 
    })
   
   }

  ngOnInit(): void {
  }

  onSubmit(){

    console.log(this.loginForm.value);

    if (this.loginForm.valid) {
    var response_data = [];
    let url = 'admin';
    let apidata = this.loginForm.value;
      apidata['password'] = (this.loginForm.value.password);
    

    this.apiService.loginrequest(apidata).subscribe((data) => {
      console.log(data);
      if(data[0]){
        localStorage.setItem("isLoggedin", "true");
        this.router.navigate(['/products']);
      } else {
        localStorage.setItem("isLoggedin", "false");
        this.openSwal('Please enter valid credentials', 'error');
      }

    },
    (error) => {
      console.log(error);
      this.openSwal('Something went wrong', 'error');
    })
  
    }
  
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
    

    
  


