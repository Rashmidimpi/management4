import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApihandlerService } from 'src/app/shared/apihandler.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errors = null;
  submitted = false;

  constructor( public router: Router, public fb: FormBuilder, private apiService: ApihandlerService ) { 
    this.registerForm = this.fb.group({
      first_name: ['', [Validators.required,  Validators.pattern('[a-zA-Z ]*')]],
      last_name: ['', [Validators.required,  Validators.pattern('[a-zA-Z ]*')]],
      email: ['',[Validators.required,Validators.email]],
      password: ['',  [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['',  [Validators.required, Validators.minLength(8)]]

    })
  }
  

  ngOnInit(): void {
  }

  onSubmit(){
    let url = 'admin';
    let apidata = this.registerForm.value;
    console.log('apidata :: ', apidata);

    this.apiService.postrequest(url, apidata).subscribe((data) => {
      console.log(data);
      this.router.navigate(['/']);
      this.openSwal('User registered', 'success');
    },
      (error) => {
        console.log(error);
        this.openSwal('Something went wrong', 'error');
      }
    )
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
