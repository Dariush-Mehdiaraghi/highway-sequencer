import { SoundObject } from './sound-object.model';
import * as cocoSSD from "@tensorflow-models/coco-ssd";
import * as Tone from 'tone'

export module TensorflowModel {
  export async function detectVideo(video: HTMLVideoElement, canvas: HTMLCanvasElement, soundObjects: SoundObject[]) {
    if (video !== undefined) {
      const model = await cocoSSD.load({ base: "mobilenet_v2" });
      this.detectFrame(video, canvas, model, soundObjects);
    }
    else {
      console.log('Passed video was not loaded yet!');
    }
  }

  export async function detectFrame(video, canvas, model, soundObjects: SoundObject[]) {
    const predictions = await model.detect(video);
    this.renderPredictions(video, canvas, predictions, soundObjects);
    requestAnimationFrame(() => {
      this.detectFrame(video, canvas, model, soundObjects);
    });
  }
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


  export function renderPredictions(video, canvas, predictions, soundObjects: SoundObject[]) {


    const ctx = canvas.getContext("2d");
    const canvasLeft = document.querySelector("#canvas").getBoundingClientRect().left
    const canvasTop = document.querySelector("#canvas").getBoundingClientRect().top
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // Font options.
    const font = "16px sans-serif";
    ctx.font = font;
    ctx.textBaseline = "top";
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    predictions.forEach(prediction => {

      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      const width = prediction.bbox[2];
      const height = prediction.bbox[3];
      soundObjects.forEach(soundObject => {
        let soundObjX = soundObject.position.left - canvasLeft
        let soundObjY = soundObject.position.top - canvasTop
        let soundObjHeight = soundObject.position.height
        let soundObjWidth = soundObject.position.width
        let isColliding =  !(soundObjX >= (x + width) || soundObjY >= y + height || (soundObjX + soundObjWidth) <= x || (soundObjY + soundObjHeight) <= y)
        if(isColliding){
          sampler.triggerAttackRelease(["Eb4"], 4);
        }
        ctx.strokeStyle = "#ff0081";
        ctx.strokeRect(soundObjX, soundObjY, soundObjWidth, soundObjHeight);

      })



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
