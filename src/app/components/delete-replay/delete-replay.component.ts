import { Component, OnInit } from '@angular/core';
import { ReplayService } from '../../services/replays.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  template:''
})
export class DeleteReplayComponent implements OnInit {
  public replayId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private replayService: ReplayService
  ) { }

  ngOnInit() {
    this.replayId = this.route.snapshot.params['id'];
    this.deleteReplay();
  }

  deleteReplay(): void {
    this.replayService.deleteReplay(this.replayId).subscribe(
      data => {
        this.deleteSuccessfull();
      },
      err => {
        console.log(err);
      }
    )
  }

  deleteSuccessfull(): void {
    this.router.navigateByUrl('/myreplays');
  }

}
