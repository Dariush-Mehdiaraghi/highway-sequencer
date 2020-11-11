import {Component, Input, OnInit} from '@angular/core';
import {StreamModel} from "../../models/stream.model";
import {StreamService} from "../../services/stream.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-stream-list',
  templateUrl: './stream-list.component.html',
  styleUrls: ['./stream-list.component.scss']
})
export class StreamListComponent implements OnInit {

  public streams: StreamModel[] = [];

  private streamsSubscription: Subscription;

  constructor(private streamService: StreamService) { }

  ngOnInit(): void {
    this.streamsSubscription = this.streamService.streams$.subscribe((streams) => {
      this.streams = streams;
    });
  }

}
