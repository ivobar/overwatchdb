import { Component, OnInit, Input } from '@angular/core';
import { ReplayModel } from '../models/replay.model';
import { DomSanitizer, SafeUrl, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-replay-card',
  templateUrl: './replay-card.component.html',
  styleUrls: ['./replay-card.component.css']
})
export class ReplayCardComponent implements OnInit {
  @Input('replayProp') replayProp: ReplayModel;
  background: SafeStyle;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.background = this.sanitizer.bypassSecurityTrustStyle(`url(${this.replayProp.thumbnail})`);    
  }

}
