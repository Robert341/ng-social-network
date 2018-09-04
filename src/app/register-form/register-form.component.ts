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

  constructor(
    private _formBuilder: FormBuilder,
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this._formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      dateOfBirth: [null, Validators.required],
      gender: [null, Validators.required],
      email: [null, Validators.required],
      pass: [null, Validators.required],
      rePass: [null, Validators.required]
    });
  }

  onRegister() {
    console.log(this.registerForm.value);
    /*
    this._userService.register(this.registerForm.value).subscribe(resRegisterAttempt => {
      if (resRegisterAttempt.success === true) {
        window.location.replace('/feed');
      } else {
        window.location.reload();
      }
    });
    */
  }
}
