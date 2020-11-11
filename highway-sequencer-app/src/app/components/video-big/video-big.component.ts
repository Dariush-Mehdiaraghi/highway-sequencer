import {Component, Input, OnInit} from '@angular/core';
import {StreamModel} from "../../models/stream.model";

@Component({
  selector: 'app-video-big',
  templateUrl: './video-big.component.html',
  styleUrls: ['./video-big.component.scss']
})
export class VideoBigComponent implements OnInit {

  @Input()
  public stream: StreamModel;

  constructor() {

  }

  ngOnInit(): void {
  }


}
