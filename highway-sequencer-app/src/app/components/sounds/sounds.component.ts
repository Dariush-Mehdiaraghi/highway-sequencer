import { StreamService } from './../../services/stream.service';
import { SoundObjectService } from './../../services/sound-object.service';

import { SoundObject } from './../../models/sound-object.model';
import { NgForOf, NgForOfContext } from '@angular/common';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-sounds',
  //templateUrl: './sounds.component.html',
  styleUrls: ['./sounds.component.scss'],
  
  template: `
  
    <sound-object [soundObject]=soundObject *ngFor="let soundObject of soundObjects" >
    </sound-object>

`,
})
export class SoundsComponent implements OnInit {


  public soundObjects: SoundObject[] = [];
  constructor(private soundObjectService: SoundObjectService) { }
  ngOnInit(): void {
    this.soundObjectService.soundObjects$.subscribe((soundObjectsFromService) => {
      this.soundObjects = soundObjectsFromService
    })
   // this.soundObjects.push({name:"kick", pathToFile:"sound-files/kick.mp3", type:"drums"})
    
  }

}
