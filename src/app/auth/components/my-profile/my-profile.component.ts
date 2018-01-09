import { Component, OnInit } from '@angular/core';
import { UpdateModel } from '../../models/update.model';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../auth.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  public model: UpdateModel;
  public formReveal: boolean;
  public updateForm: FormGroup;
  public errorMessagesArr: string[];
  public errMessage: string;
  public updateFail: boolean;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.errorMessagesArr = [''];
  }

  ngOnInit() {
    this.updateForm = this.fb.group({
      username: [localStorage.getItem('username'), Validators.required],
      email: [localStorage.getItem('email') ? localStorage.getItem('email') : '', Validators.required],
      battleTag: [localStorage.getItem('battleTag') ? localStorage.getItem('battleTag') : '', Validators.required]
    })

    let usernameControl = this.updateForm.get('username');
    this.validationErrorMessage(usernameControl, 'Username');

    let emailControl = this.updateForm.get('email');
    this.validationErrorMessage(emailControl, 'E-mai;');

    let battleTagControl = this.updateForm.get('battleTag');
    this.validationErrorMessage(battleTagControl, 'Battle tag');
  }

  revealForm() {
    this.formReveal = true;
  }

  updateUser() {
    this.model = new UpdateModel(
      this.updateForm.value.username,
      this.updateForm.value.email,
      this.updateForm.value.battleTag
    );

    this.authService.update(this.model).subscribe(
      data => {
        this.successfulUpdate(data);
      },
      err => {
        this.updateFail = true;
        this.errMessage = 'Invalid credentials!'
      }
    )
  }

  successfulUpdate(data): void {
    this.authService.authtoken = data['_kmd']['authtoken'];
    this.authService.user = data['username'];
    localStorage.setItem('authtoken', data['_kmd']['authtoken']);
    localStorage.setItem('username', data['username']);
    localStorage.setItem('userId', data['_id']);
    localStorage.setItem('email', data['email']);
    localStorage.setItem('battleTag', data['battleTag']);
    this.updateFail = false;
    this.formReveal = false;
    this.router.navigateByUrl('/myprofile');
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
