import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {StreamModel} from "../models/stream.model";

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  private _streams: BehaviorSubject<StreamModel[]> = new BehaviorSubject<StreamModel[]>([])

  // subscribe to streams object to get notified on change
  public get streams$() : Observable<StreamModel[]> {
    return this._streams.asObservable();
  }

  // get current loaded streams
  public get streams() : StreamModel[] {
    return this._streams.value;
  }

  constructor() {

    // init default available streams
    this._streams.next(this.loadStreams());
  }

  public getStream(streamId: number) : StreamModel {
    return this.streams.find(o => o.id == streamId);
  }

  private loadStreams() : StreamModel[] {
    let streamsFound : StreamModel[] = [];

    streamsFound.push({ id: 1, url: "https://wzmedia.dot.ca.gov/D3/80_chiles.stream/chunklist_w1078028386.m3u8", videoType: "application/x-mpegURL", name: "amiland"});
    streamsFound.push({ id: 2, url: "https://s3.ipcamlive.com/streams/035f9b720e9b88a28/stream.m3u8", videoType: "application/x-mpegURL", name: "england"});
    streamsFound.push({ id: 3, url: "https://wzmedia.dot.ca.gov/D3/5_pocket.stream/chunklist_w22356296.m3u8", videoType: "application/x-mpegURL", name: "sacramento"});
    //streamsFound.push({ id: 3, url: "https://www.youtube.com/embed/XDzc5u0zvmU", videoType: "iframe", name: "Shin-Midōsuji"});

    return streamsFound;
  }
}


