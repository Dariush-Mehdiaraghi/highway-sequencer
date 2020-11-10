import {Component, Input, OnInit} from '@angular/core';
import {StreamModel} from "../../models/stream.model";

@Component({
  selector: 'app-stream-item',
  templateUrl: './stream-item.component.html',
  styleUrls: ['./stream-item.component.scss']
})
export class StreamItemComponent implements OnInit {

  @Input()
  public stream: StreamModel

  constructor() { }

  ngOnInit(): void {
    console.log(this.stream.url)
  }

}
