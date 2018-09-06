import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  registerForm: FormGroup;
  formChecked = false;
  inFocus = {
    firstName: false,
    lastName: false,
    dateOfBirth: false,
    email: false,
    pass: false,
    rePass: false
  };

  constructor(
    private _formBuilder: FormBuilder,
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this._formBuilder.group({
      firstName: [null, [Validators.required, Validators.pattern(/^[A-Z][a-z]+$/)]],
      lastName: [null, [Validators.required, Validators.pattern(/^[A-Z][a-z]+$/)]],
      dateOfBirth: [null, Validators.required],
      gender: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9_.-]+@+[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,4}$/)]],
      pass: [null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,12}$/)]],
      rePass: [null, Validators.required]
    });
  }

  onRegister() {
    this.formChecked = true;

    if (this.registerForm.valid && this.registerForm.value.pass === this.registerForm.value.rePass) {
      this._httpService.register(this.registerForm.value).subscribe(res => {
        if (res.success === true) {
          window.location.replace('/main');
        } else if (res.message === 'SERVER_ERROR') {
          window.alert('Server error! Could not register user.');
        } else if (res.message === 'EMAIL_REGISTERED') {
          window.alert('User with this e-mail already exists!');
        } else {
          window.alert('Unhandled error!');
        }
      });
    }
  }
}
