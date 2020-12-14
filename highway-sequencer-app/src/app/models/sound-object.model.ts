export interface SoundObject {
  name: string;
  triggered: boolean;
  position: {
    left: number;
    top: number;
    width: number;
    height: number;
  }
}
