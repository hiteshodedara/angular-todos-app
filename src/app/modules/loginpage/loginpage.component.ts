import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.sass']
})
export class LoginpageComponent implements OnInit {
  userLoginForm!: FormGroup;
  showPassword: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.userLoginForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onPasswordShow() {
    this.showPassword = !this.showPassword;
  }

  onClickLogin() {
    if (this.userLoginForm.valid) {
      console.log(this.userLoginForm.value);
      this.userLoginForm.reset();
    } else {
      // Handle form validation errors
      this.userLoginForm.markAllAsTouched(); 
      
      if(this.userLoginForm.value.userName){
        console.error("Enter the Password");
      }else if(this.userLoginForm.value.password){
        console.error("Enter the Username");
      }else{
        console.error('Form is invalid. Please check the fields.');
      }
    }
  }
}
