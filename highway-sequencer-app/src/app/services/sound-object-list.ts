import { SoundObject } from './../models/sound-object.model';



export const soundObjectList: SoundObject[] = [
  {
    name: "kick",
    pathToFile: "sound-files/kick.mp3",
    type: "drums",
    position:{
      left:0,
      top:0,
      width: 10,
      height: 10
    }
  },
  {
    name: "synth",
    pathToFile: "sound-files/synth.mp3",
    type: "synth",
    position:{
      left:0,
      top:0,
      width: 10,
      height: 10
    }
  },
  
];