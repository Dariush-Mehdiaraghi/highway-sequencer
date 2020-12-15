import { SoundObject } from 'src/app/models/sound-object.model';
import { noteNames } from './note-names';

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
  public set setSoundObjectPosition(newPosObj: { name: string, position: { left: number, top: number, width: number, height: number }}) {
    this._soundObjects.next( this.getNewStateWithValues(newPosObj.name, "position", newPosObj.position))
  }
  public set setTriggered(newTriggeredObjName: string) {
    this._soundObjects.next(this.getNewStateWithValues(newTriggeredObjName,"triggered",true))
  }
  private getNewStateWithValues(name: string, propertyName: string, propertyValue: any):SoundObject[] {
    let newSoundObjects = this.soundObjects
    newSoundObjects[newSoundObjects.indexOf(newSoundObjects.find(soundObject => soundObject.name == name))][propertyName] = propertyValue
    return newSoundObjects
  }
  public set setNotTriggered(newTriggeredObjName: string) {
    this._soundObjects.next(this.getNewStateWithValues(newTriggeredObjName,"triggered",false))
  }
  constructor() {
    //let soundObjects: SoundObject[] = []
    let aOctave = []
    const numberOfOctaves = 4
    for (let i = 0; i < numberOfOctaves; i++) {
      let incomingNotes = noteNames.map(note => {
      return {
        name: note+(i + 2),
        triggered: false,
        position: {
          left: 0,
          top: 0,
          width: 0,
          height: 0
        },
      }
    })

      aOctave.push(...incomingNotes)
    }

    this._soundObjects.next(aOctave);
  }
}
