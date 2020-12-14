
import { SoundObject } from './../../models/sound-object.model';
import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { SoundObjectService } from 'src/app/services/sound-object.service';

@Component({
  selector: 'sound-object',
  //templateUrl: './sounds.component.html',
  styleUrls: ['./sound-object.component.scss'],

  template: `
  <div class="keyboard">
  <div ngDraggable class="sound-object resizable-widget ng-resizable"  [class.black-key]="soundObject.name.includes('#')" [class.has-margin-left]="soundObject.name.includes('C#') || soundObject.name.includes('F#') " (mouseup)="mouseUp()">
  </div>
  </div>
`,
})



export class SoundObjectComponent implements OnInit {

  @Input()
  public soundObject: SoundObject


  constructor(private el: ElementRef, private soundObjectService: SoundObjectService) {

  }

  ngOnInit(): void {

  }
  public mouseUp() {

    const boundingRect = this.el.nativeElement.children[0].getBoundingClientRect()
    this.soundObjectService.setSoundObjectPosition = { name: this.soundObject.name, position: { left: boundingRect.left, top: boundingRect.top, width: boundingRect.width, height: boundingRect.height } }

  }

}
