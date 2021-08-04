import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  errors = null;


  constructor( public router: Router, public fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['',[Validators.required, ,Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]], 
    })
   
   }

  ngOnInit(): void {
  }

  onSubmit(){
    
    this.router.navigate(['/products']);
  }

}
