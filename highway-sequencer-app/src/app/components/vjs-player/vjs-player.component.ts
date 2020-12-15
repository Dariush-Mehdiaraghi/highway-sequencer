import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import videojs from 'video.js';
import {SoundObject} from 'src/app/models/sound-object.model';
import {SoundObjectService} from 'src/app/services/sound-object.service';
import {YoloModel} from "../../models/yolo.model";
import {YoloTypeModel} from "../../models/yoloType.model";

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

  constructor(private elementRef: ElementRef, private soundObjectService: SoundObjectService) { }


  public soundObjects: SoundObject[] = [];

  ngOnInit() {
    // instantiate Video.js
    this.player = videojs(this.target.nativeElement, this.options, function onPlayerReady() {});

    this.soundObjectService.soundObjects$.subscribe((soundObjectsFromService) => {
      this.soundObjects = soundObjectsFromService
    })
  }

  ngOnDestroy() {
    // destroy player
    if (this.player) {
      this.player.dispose();
    }
  }

  public async videoDataLoaded() {
    if (this.enabledDetection) {
      const component = document.getElementById("video-big");
      const video = <HTMLVideoElement>component.getElementsByClassName("vjs-tech")[0];
      const canvas = <HTMLCanvasElement> document.getElementById("canvas");

      await YoloModel.detectVideo(YoloTypeModel.yoloV3Tiny, video, canvas, this.soundObjects, this.soundObjectService);
      //await TensorflowModel.detectVideo(video, canvas, this.soundObjects);
    }
  }
}
