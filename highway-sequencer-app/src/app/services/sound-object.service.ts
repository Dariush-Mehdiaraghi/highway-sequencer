import { SoundObject } from './../models/sound-object.model';
import { soundObjectList } from './sound-object-list';

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Position } from 'angular2-draggable';

@Injectable({
  providedIn: 'root'
})
export class SoundObjectService {
  private _soundObjects: BehaviorSubject<SoundObject[]> = new BehaviorSubject<SoundObject[]>([])

  public get soundObjects$(): Observable<SoundObject[]> {
    return this._soundObjects.asObservable();
  }
  public get soundObjects(): SoundObject[] {
    return this._soundObjects.value;
  }
  public set setSoundObjectPosition(newPosObj: { name: string, position: { left: number, top: number, width: number, height: number} }) {
    let newSoundObjects = this.soundObjects
    newSoundObjects[newSoundObjects.indexOf(newSoundObjects.find(soundObject => soundObject.name == newPosObj.name))].position = newPosObj.position
    this._soundObjects.next(newSoundObjects)
  }
  constructor() {

    // init sound objects
    this._soundObjects.next(soundObjectList);

  }
}
