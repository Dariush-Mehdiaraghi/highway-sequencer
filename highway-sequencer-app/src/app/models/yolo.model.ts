import * as tf from '@tensorflow/tfjs';
import yolo from 'tfjs-yolo';

export module YoloModel {
  export async function detectVideo(canvas, video) {
    let myYolo = await yolo.v3tiny();
    //const boxes = await myYolo.predict(video);
    //console.log(boxes);
  }
}
