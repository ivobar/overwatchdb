import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../auth.service';
import { RegisterModel } from '../../models/register.model';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  public model: RegisterModel;
  public registeredUser: string;
  public errMessage: string;
  public registerSuccess: boolean;
  public registerFail: boolean;
  public regForm: FormGroup;
  public errorMessagesArr: string[];

  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.errorMessagesArr = ['Username is mandatory!'];
  }

  ngOnInit() {
    this.regForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rePassword: ['', Validators.required],
      email: ['', Validators.required],
      battleTag: ['', Validators.required]
    })

    const usernameControl = this.regForm.get('username');
    this.validationErrorMessage(usernameControl,'Username');

    const passwordControl = this.regForm.get('password');
    this.validationErrorMessage(passwordControl,'Password');
    
    const emailControl = this.regForm.get('email');
    this.validationErrorMessage(emailControl,'E-mail');

    const battleTagControl = this.regForm.get('battleTag');
    this.validationErrorMessage(battleTagControl,'Battle tag');    
    
  }

  register(): void {
    this.model = new RegisterModel(
      this.regForm.value.username,
      this.regForm.value.password,
      this.regForm.value.email,
      this.regForm.value.battleTag
    );
    if (this.model.password !== this.regForm.value.rePassword) {
      this.errMessage = '';
      this.errorMessagesArr = this.errorMessagesArr.filter(m => m !== 'Passwords don\'t match!');
      this.errorMessagesArr.push('Passwords don\'t match!');
      this.errMessage = this.errorMessagesArr.join(' ');
      return;
    }
    this.authService.register(this.model)
      .subscribe(
      data => {
        this.successfulRegister(data);
      },
      err => {
        this.registerFail = true;
      }
      )
  }

  get diagnostics(): string {
    return JSON.stringify(this.model);
  }

  successfulRegister(data): void {
    this.registerSuccess = true;
    this.registeredUser = data['username'];
    this.authService.authtoken = data['_kmd']['authtoken'];
    this.authService.user = data['username'];
    localStorage.setItem('authtoken', data['_kmd']['authtoken']);
    localStorage.setItem('username', data['username']);
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
