import { SoundObjectService } from 'src/app/services/sound-object.service';
import yolo from 'tfjs-yolo';
import { SoundObject } from "./sound-object.model";
import * as Tone from "tone";
import { YoloTypeModel } from "./yoloType.model";

export module YoloModel {
  const sampler = new Tone.Sampler({
    urls: {
      "C4": "C4.mp3",
      "D#4": "Ds4.mp3",
      "F#4": "Fs4.mp3",
      "A4": "A4.mp3",
    },
    release: 4,
    baseUrl: "https://tonejs.github.io/audio/salamander/",
  }).toDestination();

  export async function detectVideo(library: YoloTypeModel, video: HTMLVideoElement, canvas: HTMLCanvasElement, soundObjects: SoundObject[], soundObjectService: SoundObjectService) {
    if (video !== undefined) {
      let model = null;
      console.log("Loading model: " + library);
      switch (library) {
        case YoloTypeModel.yoloV1Tiny:
          model = await yolo.v1tiny();
          break;
        case YoloTypeModel.yoloV2Tiny:
          model = await yolo.v2tiny();
          break;
        case YoloTypeModel.yoloV3Tiny:
          model = await yolo.v3tiny();
          break;
        case YoloTypeModel.yoloV3:
          model = await yolo.v3();
          break;
        default:
          return;
      }
      console.log("Loading model: " + library + " done");

      this.detectFrame(video, canvas, model, soundObjects, soundObjectService);
    }
    else {
      console.log('Passed video was not loaded yet!');
    }
  }
  export async function detectFrame(video, canvas, model, soundObjects: SoundObject[], soundObjectService: SoundObjectService) {

    const predictions = await model.predict(video, {
      maxBoxes: 20,          // defaults to 20
      scoreThreshold: .2,   // defaults to .5
      iouThreshold: .3,     // defaults to .3
    });

    this.renderPredictions(video, canvas, predictions, soundObjects, soundObjectService);

    requestAnimationFrame(() => {
      this.detectFrame(video, canvas, model, soundObjects, soundObjectService);
    });
  }
  export function renderPredictions(video, canvas, predictions, soundObjects: SoundObject[], soundObjectService: SoundObjectService) {
    const ctx = canvas.getContext("2d");
    const canvasLeft = canvas.getBoundingClientRect().left
    const canvasTop = canvas.getBoundingClientRect().top
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    predictions.forEach(prediction => {
      const x = prediction.left;
      const y = prediction.top;
      const width = prediction.width;
      const height = prediction.height;

      // draw box
      ctx.strokeStyle = "#00FFFF";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);

      soundObjects.forEach(soundObject => {
        let soundObjX = soundObject.position.left - canvasLeft
        let soundObjY = soundObject.position.top - canvasTop
        let soundObjHeight = soundObject.position.height
        let soundObjWidth = soundObject.position.width
        let isColliding = !(soundObjX >= (x + width) || soundObjY >= y + height || (soundObjX + soundObjWidth) <= x || (soundObjY + soundObjHeight) <= y)

        if (isColliding) {
          soundObjectService.setTriggered = (soundObject.name)
          sampler.triggerAttackRelease(soundObject.name, "2n");
        }
        else if(soundObject.triggered){
          soundObjectService.setNotTriggered = (soundObject.name)
        }
        ctx.strokeStyle = "#ff0081";
        ctx.strokeRect(soundObjX, soundObjY, soundObjWidth, soundObjHeight);
      });


      ctx.fillStyle = "#000000";
      ctx.fillText(prediction.class, x, y);

    });
  };
}
