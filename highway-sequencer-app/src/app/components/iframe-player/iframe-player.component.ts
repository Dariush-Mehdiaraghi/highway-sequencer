import {Component, Input, OnInit} from '@angular/core';
import {StreamModel} from "../../models/stream.model";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-video-iframe',
  templateUrl: './iframe-player.component.html',
  styleUrls: ['./iframe-player.component.scss']
})
export class IframePlayerComponent implements OnInit {

  @Input()
  public stream: StreamModel;

  constructor(private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  get safeURL() : SafeResourceUrl {
    return this._sanitizer.bypassSecurityTrustResourceUrl(this.stream.url);
  }

}
