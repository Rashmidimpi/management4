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

  User: any = ['Buyer', 'Seller'];

  constructor( public router: Router, public fb: FormBuilder ) { 
    this.registerForm = this.fb.group({
      first_name: ['', [Validators.required,  Validators.pattern('[a-zA-Z ]*')]],
      last_name: ['', [Validators.required,  Validators.pattern('[a-zA-Z ]*')]],
      email: ['',[Validators.required,Validators.email]],
      password: ['',  [Validators.required, Validators.minLength(8)]],
      role: ['', Validators.required],

    })
  }
  

  ngOnInit(): void {
  }

  onSubmit(){
    
  }

}
