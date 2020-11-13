import { SoundObject } from './models/sound-object.model';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { StreamListComponent } from './components/stream-list/stream-list.component';
import { StreamItemComponent } from './components/stream-item/stream-item.component';
import { VideoPreviewComponent } from './components/video-preview/video-preview.component';
import { VjsPlayerComponent } from './components/vjs-player/vjs-player.component';
import { HeaderComponent } from './components/header/header.component';
import { DetailComponent } from './views/detail/detail.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { VideoBigComponent } from './components/video-big/video-big.component';
import { SoundsComponent } from './components/sounds/sounds.component';
import { SoundObjectComponent } from './components/sounds/sound-object.component';
import { AngularDraggableModule } from 'angular2-draggable';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StreamListComponent,
    StreamItemComponent,
    VideoPreviewComponent,
    VjsPlayerComponent,
    HeaderComponent,
    DetailComponent,
    PageNotFoundComponent,
    VideoBigComponent,
    SoundsComponent,
    SoundObjectComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularDraggableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
