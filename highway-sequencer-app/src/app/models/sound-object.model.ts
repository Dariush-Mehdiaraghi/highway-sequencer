export interface SoundObject {
  name: string;
  pathToFile: string;
  type: string;
  position: {
    left: number;
    top: number;
    width: number;
    height: number;
  }
}
