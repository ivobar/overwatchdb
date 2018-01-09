import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReplayService } from '../../services/replays.service';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ReplayModel } from '../models/replay.model';

@Component({
  selector: 'app-edit-replay',
  templateUrl: './edit-replay.component.html',
  styleUrls: ['./edit-replay.component.css']
})
export class EditReplayComponent implements OnInit {
  public replayEditForm: FormGroup;
  public errMessage: string;
  public errorMessagesArr: string[];
  public editFail: boolean;
  public replayId: string;
  public model: ReplayModel;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private replayService: ReplayService
  ) { }

  ngOnInit() {
    this.replayEditForm = this.fb.group({
      thumbnail: ['Fetching data...', Validators.required],
      title: ['Fetching data...', Validators.required],
      video: ['Fetching data...', Validators.required]
    })

    const titleControl = this.replayEditForm.get('title');
    this.validationErrorMessage(titleControl, 'Title');

    const videoControl = this.replayEditForm.get('video');
    this.validationErrorMessage(videoControl, 'Video');

    const thumbnailControl = this.replayEditForm.get('thumbnail');
    this.validationErrorMessage(thumbnailControl, 'Thumbnail');


    this.replayId = this.route.snapshot.params['id'];
    this.replayService.getReplay(this.replayId).subscribe(
      data => {
        this.replayEditForm = this.fb.group({
          thumbnail: [data.thumbnail, Validators.required],
          title: [data.title, Validators.required],
          video: [data.video, Validators.required]
        })
      },
      err => {
        this.errMessage = 'Failed to get replay from the server!';
      }
    )
  }

  editReplay(): void {
    this.model = new ReplayModel(
      this.replayEditForm.value.video,
      this.replayEditForm.value.thumbnail,
      this.replayEditForm.value.title
    );

    this.replayService.updateReplay(this.replayId, this.model).subscribe(
      data => {
        this.successfullEdit();
      }, err => {
        console.log(err);
        this.errMessage = 'Creating replay failed - try again!';
      }
    )
  }

  successfullEdit(): void {
    this.editFail = false;
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
