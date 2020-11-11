import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import videojs from 'video.js';
import {BehaviorSubject, Observable} from "rxjs";
import * as cocoSSD from "@tensorflow-models/coco-ssd";
import {TensorflowModel} from "../../models/tensorflow.model";

@Component({
  selector: 'app-vjs-player',
  template: `
    <div class="video-wrapper">
      <video #target [hidden]="enabledDetection" (loadeddata)="videoDataLoaded()" class="video-js" controls muted playsinline preload="auto"></video>
      <canvas id="canvas"></canvas>
    </div>
  `,
  styleUrls: [
    './vjs-player.component.scss'
  ],
  encapsulation: ViewEncapsulation.None,
})
export class VjsPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('target', {static: true}) target: ElementRef;
  @Input() options: {
    fluid: boolean,
    aspectRatio: string,
    autoplay: boolean,
    sources: {
      src: string,
      type: string,
    }[],
  };
  player: videojs.Player;

  @Input()
  public enabledDetection: boolean;


  public video: HTMLVideoElement;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    // instantiate Video.js
    this.player = videojs(this.target.nativeElement, this.options, function onPlayerReady() {});

  }

  ngOnDestroy() {
    // destroy player
    if (this.player) {
      this.player.dispose();
    }
  }

  public async videoDataLoaded() {
    console.log('video detection: ', this.enabledDetection)
    if (this.enabledDetection) {
      const component = document.getElementById("video-big");
      const video = <HTMLVideoElement>component.getElementsByClassName("vjs-tech")[0];
      const canvas = <HTMLCanvasElement> document.getElementById("canvas");

      await TensorflowModel.detectVideo(video, canvas);
    }
  }
}
