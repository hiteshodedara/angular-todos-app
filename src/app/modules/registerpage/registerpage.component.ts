import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.sass']
})
export class RegisterpageComponent implements OnInit {
  userRegistrationForm!: FormGroup;
  showPassword: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.userRegistrationForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(10)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  OnShowPassword() {
    this.showPassword = !this.showPassword;
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onClickRegister() {
    if (this.userRegistrationForm.valid) {
      console.log('Form submitted:', this.userRegistrationForm.value);
      this.userRegistrationForm.reset();
    } else {
      this.userRegistrationForm.markAllAsTouched(); // Mark all fields as touched to display validation messages
      console.error('Form is invalid. Please check the fields.');
    }
  }
}
