import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../auth.service';
import { LoginModel } from '../../models/login.model';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit {
  public model : LoginModel;
  public loginFail : boolean;
  public username : string;
  public logForm : FormGroup;
  public errMessage: string;
  public errorMessagesArr: string[];

  constructor(
    private authService : AuthenticationService,
    private router : Router,
    private fb : FormBuilder
  ) {
    this.errorMessagesArr = ['Username is mandatory!']
  }

  ngOnInit(){
    this.logForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

    const usernameControl = this.logForm.get('username');
    this.validationErrorMessage(usernameControl,'Username');

    const passwordControl = this.logForm.get('password');
    this.validationErrorMessage(passwordControl,'Password');
  }

  login () : void {
    this.model = new LoginModel(
      this.logForm.value.username,
      this.logForm.value.password
    );
    this.authService.login(this.model)
      .subscribe(
        data => {
          this.successfulLogin(data);
        },
        err => {
          this.loginFail = true;
          this.errMessage = 'Invalid credentials!'
        }
      )
  }

  get diagnostics() : string {
    return JSON.stringify(this.model);
  }

  successfulLogin(data) : void {
    this.authService.authtoken = data['_kmd']['authtoken'];
    this.authService.user = data['username'];
    localStorage.setItem('authtoken', data['_kmd']['authtoken']);
    localStorage.setItem('username', data['username']);
    this.loginFail = false;
    this.router.navigateByUrl('/home');
  }

  validationErrorMessage(control: AbstractControl, field: string): void {
    control.valueChanges.subscribe(value => {
      this.errorMessagesArr = this.errorMessagesArr.filter(m => m !== `${field} is mandatory!`);
      this.errMessage = this.errorMessagesArr.join(' ');
      if ((control.touched || control.dirty) && control.errors) {
        if (control.errors.required) {
          this.errorMessagesArr = this.errorMessagesArr.filter(m => m !== `${field} is mandatory!`);
          this.errorMessagesArr.push(`${field} is mandatory!`);
          this.errMessage = this.errorMessagesArr.join(' ');
        }
      }
    })
  }
}
