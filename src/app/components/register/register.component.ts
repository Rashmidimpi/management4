import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errors = null;
  submitted = false;

  role: any = ['Buyer', 'Seller'];

  constructor( public router: Router, public fb: FormBuilder ) { 
    this.registerForm = this.fb.group({
      first_name: ['', [Validators.required,  Validators.pattern('[a-zA-Z ]*')]],
      last_name: ['', [Validators.required,  Validators.pattern('[a-zA-Z ]*')]],
      email: ['',[Validators.required,Validators.email]],
      password: ['',  [Validators.required, Validators.minLength(8)]],
      role: [''],

    })
  }
  

  ngOnInit(): void {
  }

  onSubmit(){
     this.submitted = true;
    if(!this.registerForm.valid) {
      alert('Please fill all the required fields to sign up!')
    } else {
      console.log(this.registerForm.value)
      this.router.navigate(['/signin']);
    }
  
  }

}
