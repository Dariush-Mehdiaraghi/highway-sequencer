import {Component, Input, OnInit} from '@angular/core';
import {StreamModel} from "../../models/stream.model";

@Component({
  selector: 'app-video-preview',
  templateUrl: './video-preview.component.html',
  styleUrls: ['./video-preview.component.scss']
})
export class VideoPreviewComponent implements OnInit {

  @Input()
  public stream: StreamModel;

  @Input()
  public videoWidth: number;

  @Input()
  public videoHeight: number;

  constructor() { }

  ngOnInit(): void {
  }

}
