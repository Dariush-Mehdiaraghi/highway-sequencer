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

@Component({
  selector: 'app-vjs-player',
  template: `
    <div class="video-wrapper">
      <video #target [hidden]="enabledDetection" (loadeddata)="watchVideo()" class="video-js" controls muted playsinline preload="auto"></video>
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
    this.player = videojs(this.target.nativeElement, this.options, function onPlayerReady() {
      console.log("should be loaded");
    });

  }

  ngOnDestroy() {
    // destroy player
    if (this.player) {
      this.player.dispose();
    }
  }

  public async watchVideo() {
    if (this.enabledDetection) {
      let component = document.getElementById("video-big");
      this.video = <HTMLVideoElement>component.getElementsByClassName("vjs-tech")[0];

      if(this.video !== undefined) {
        const model = await cocoSSD.load({base: "mobilenet_v1"});
        this.detectFrame(this.video, model);
      }
    }
  }

  private async detectFrame(video, model) {
    const predictions = await model.detect(video);
    this.renderPredictions(predictions);

    requestAnimationFrame(() => {
      this.detectFrame(video, model);
    });
  }

  renderPredictions = predictions => {
    const canvas = <HTMLCanvasElement> document.getElementById("canvas");

    const ctx = canvas.getContext("2d");

    canvas.width  = this.video.videoWidth;
    canvas.height = this.video.videoHeight;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // Font options.
    const font = "16px sans-serif";
    ctx.font = font;
    ctx.textBaseline = "top";
    ctx.drawImage(this.video,0, 0,canvas.width,canvas.height);

    predictions.forEach(prediction => {
      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      const width = prediction.bbox[2];
      const height = prediction.bbox[3];
      // Draw the bounding box.
      ctx.strokeStyle = "#00FFFF";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);
      // Draw the label background.
      ctx.fillStyle = "#00FFFF";
      const textWidth = ctx.measureText(prediction.class).width;
      const textHeight = parseInt(font, 10); // base 10
      ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
    });

    predictions.forEach(prediction => {
      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      // Draw the text last to ensure it's on top.
      ctx.fillStyle = "#000000";
      ctx.fillText(prediction.class, x, y);
    });
  };
}
