import { Component, OnInit } from '@angular/core';
import { ReplayService } from '../../services/replays.service';
import { ReplayModel } from '../models/replay.model';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-replay',
  templateUrl: './add-replay.component.html',
  styleUrls: ['./add-replay.component.css']
})
export class AddReplayComponent implements OnInit {
  public errMessage: string;
  public errorMessagesArr: string[];
  public replayForm: FormGroup;
  public createReplayFailed: boolean;
  public model: ReplayModel;

  constructor(
    private replayService: ReplayService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.errorMessagesArr = ['']
  }

  ngOnInit() {
    this.replayForm = this.fb.group({
      title: ['', Validators.required],
      video: ['', Validators.required],
      thumbnail: ['', Validators.required]
    });

    const titleControl = this.replayForm.get('title');
    this.validationErrorMessage(titleControl, 'Title');

    const videoControl = this.replayForm.get('video');
    this.validationErrorMessage(videoControl, 'Video');

    const thumbnailControl = this.replayForm.get('thumbnail');
    this.validationErrorMessage(thumbnailControl, 'Thumbnail');
  }

  createReplay(): void {
    this.model = new ReplayModel(
      this.replayForm.value.video,
      this.replayForm.value.thumbnail,
      this.replayForm.value.title
    );

    this.replayService.postReplay(this.model).subscribe(
      data => {
        this.successfullCreate();
      }, err => {
        console.log(err);
        this.errMessage='Creating replay failed - try again!';
      }
    )
  }

  successfullCreate(): void {
    this.createReplayFailed = false;
    this.router.navigateByUrl('/myreplays');
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
