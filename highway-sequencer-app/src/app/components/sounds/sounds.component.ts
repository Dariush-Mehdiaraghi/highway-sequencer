import { soundObjectList } from './../../services/sound-object-list';
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
    <div class="black-keys-container key-container"> 
      <sound-object class="black-key" ngResizable [soundObject]=soundObject *ngFor="let soundObject of blackKeys" >
      </sound-object>
    </div>
    <div class="white-keys-container key-container"> 
      <sound-object class="white-key" ngResizable [soundObject]=soundObject *ngFor="let soundObject of whiteKeys" >
      </sound-object>
    </div>
`,
})
export class SoundsComponent implements OnInit {



  public whiteKeys: SoundObject[] = [];
  public blackKeys: SoundObject[] = [];
  constructor(private soundObjectService: SoundObjectService) { }
  ngOnInit(): void {
    this.soundObjectService.soundObjects$.subscribe((soundObjectsFromService) => {
      this.whiteKeys = soundObjectsFromService.filter(obj => !obj.name.includes('#'))
      this.blackKeys = soundObjectsFromService.filter(obj => obj.name.includes('#'))
    })
    // this.soundObjects.push({name:"kick", pathToFile:"sound-files/kick.mp3", type:"drums"})

  }

}
