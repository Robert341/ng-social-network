import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  formChecked = false;
  inFocus = {
    email: false,
    pass: false
  };
  loginError = {
    noSuchUser: null,
    wrongPassword: null
  };

  constructor(private _formBuilder: FormBuilder, private _httpService: HttpService) { }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this._formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9_.-]+@+[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,4}$/)]],
      pass: [null, Validators.required]
    });
  }

  onLogin() {
    this.formChecked = true;

    if (this.loginForm.valid) {
      this._httpService.login(this.loginForm.value).subscribe(res => {
        if (res.success === true) {
          window.location.replace('/main');
        } else if (res.message === 'SERVER_ERROR') {
          window.alert('Server error! Could not log in.');
        } else if (res.message === 'NO_SUCH_USER') {
          this.loginError.noSuchUser = this.loginForm.value.email;
        } else if (res.message === 'WRONG_PASSWORD') {
          this.loginError.wrongPassword = this.loginForm.value.pass;
        } else {
          window.alert('Unhandled error!');
        }
      });
    }
  }

}
