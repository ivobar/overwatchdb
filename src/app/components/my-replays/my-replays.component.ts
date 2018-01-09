import { Component, OnInit } from '@angular/core';
import { ReplayService } from '../../services/replays.service';
import { ReplayModel } from '../models/replay.model';

@Component({
  selector: 'app-my-replays',
  templateUrl: './my-replays.component.html',
  styleUrls: ['./my-replays.component.css']
})
export class MyReplaysComponent implements OnInit {
  public replays: ReplayModel[];

  constructor(
    private replayService: ReplayService
  ) { }

  ngOnInit() {
    this.replayService.getReplays().subscribe(
      data => {
        this.replays = data;
      },
      err => {
        console.log(err);
      }
    )
  }

}
