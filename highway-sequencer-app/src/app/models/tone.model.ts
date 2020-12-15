import * as Tone from "tone";

export class ToneModel {
  static sampler = new Tone.Sampler({
    urls: {
      "C4": "C4.mp3",
      "D#4": "Ds4.mp3",
      "F#4": "Fs4.mp3",
      "A4": "A4.mp3",
    },
    release: 4,
    baseUrl: "https://tonejs.github.io/audio/salamander/",
  }).toDestination();
  static delay = 1000;
  static triggeredTones = [];

  public static trigger(name: string) {
    let tones = this.triggeredTones.filter(o => o.tone === name);

    if (tones.length > 0) {
      let tone = tones[0];
      let dif = new Date().getTime() - tone.time.getTime();

      if (this.delay < dif) {
        this.sampler.triggerAttackRelease(name, "2n");
        tones[0].time = new Date();
      }

    } else {
      this.sampler.triggerAttackRelease(name, "2n");
      this.triggeredTones.push({ tone: name, time: new Date()});
    }
  }
}
