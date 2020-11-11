import * as cocoSSD from "@tensorflow-models/coco-ssd";

export module TensorflowModel {
    export async function detectVideo(video: HTMLVideoElement, canvas: HTMLCanvasElement) {
      if(video !== undefined) {
        const model = await cocoSSD.load({base: "mobilenet_v1"});
        this.detectFrame(video, canvas, model);
      }
      else {
        console.log('Passed video was not loaded yet!');
      }
    }

    export async function detectFrame(video, canvas, model) {
      const predictions = await model.detect(video);
      this.renderPredictions(video, canvas, predictions);

      requestAnimationFrame(() => {
        this.detectFrame(video, canvas, model);
      });
    }

    export function renderPredictions(video, canvas, predictions) {
      const ctx = canvas.getContext("2d");

      canvas.width  = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      // Font options.
      const font = "16px sans-serif";
      ctx.font = font;
      ctx.textBaseline = "top";
      ctx.drawImage(video,0, 0,canvas.width,canvas.height);

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
