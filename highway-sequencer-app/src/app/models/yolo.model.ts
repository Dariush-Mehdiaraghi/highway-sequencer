import yolo from 'tfjs-yolo';
import {SoundObject} from "./sound-object.model";
import * as Tone from "tone";
import {YoloTypeModel} from "./yoloType.model";

export module YoloModel {
  const sampler = new Tone.Sampler({
    urls: {
      "C4": "C4.mp3",
      "D#4": "Ds4.mp3",
      "F#4": "Fs4.mp3",
      "A4": "A4.mp3",
    },
    release: 1,
    baseUrl: "https://tonejs.github.io/audio/salamander/",
  }).toDestination();

  export async function detectVideo(library: YoloTypeModel, video: HTMLVideoElement, canvas: HTMLCanvasElement, soundObjects: SoundObject[]) {
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

      this.detectFrame(video, canvas, model, soundObjects);
    }
    else {
      console.log('Passed video was not loaded yet!');
    }
  }
  export async function detectFrame(video, canvas, model, soundObjects: SoundObject[]) {

    const predictions = await model.predict(video);

    this.renderPredictions(video, canvas, predictions, soundObjects);

    requestAnimationFrame(() => {
      this.detectFrame(video, canvas, model, soundObjects);
    });
  }
  export function renderPredictions(video, canvas, predictions, soundObjects: SoundObject[]) {
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
          let isColliding =  !(soundObjX >= (x + width) || soundObjY >= y + height || (soundObjX + soundObjWidth) <= x || (soundObjY + soundObjHeight) <= y)

          if(isColliding){
            console.log("is colliding");
            sampler.triggerAttackRelease(Tone.Frequency(soundObjects.indexOf(soundObject) + 69, "midi").toNote(),  "8n", 4);
          }
          ctx.strokeStyle = "#ff0081";
          ctx.strokeRect(soundObjX, soundObjY, soundObjWidth, soundObjHeight);
        });
      });
  };
}
