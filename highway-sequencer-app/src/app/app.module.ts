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
import { VideoIframeComponent } from './components/video-iframe/video-iframe.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StreamListComponent,
    StreamItemComponent,
    VideoPreviewComponent,
    VjsPlayerComponent,
    HeaderComponent,
    VideoIframeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
