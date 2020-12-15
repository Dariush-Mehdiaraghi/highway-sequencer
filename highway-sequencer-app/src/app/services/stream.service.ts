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
    //streamsFound.push({ id: 2, url: "https://s3.ipcamlive.com/streams/035fac90be7f0b35c/stream.m3u8", videoType: "application/x-mpegURL", name: "england"});
    streamsFound.push({ id: 3, url: "https://wzmedia.dot.ca.gov/D3/5_pocket.stream/chunklist_w22356296.m3u8", videoType: "application/x-mpegURL", name: "sacramento"});
    //streamsFound.push({ id: 3, url: "https://www.youtube.com/embed/XDzc5u0zvmU", videoType: "iframe", name: "Shin-Midōsuji"});
    //https://www.earthcam.com/usa/louisiana/neworleans/bourbonstreet/?cam=catsmeow2
    streamsFound.push({ id: 5, url: "https://stream.talgov.net/Cameras/City_CCM21.stream/chunklist_w807356817.m3u8", videoType: "application/vnd.apple.mpegurl", name: "Tennessee"});
    //https://www.abbeyroad.com/Crossing
    streamsFound.push({ id: 6, url: "https://traffic.talgov.net/HLS/CITY_CCM01.m3u8", videoType: "application/vnd.apple.mpegurl", name: "Talahesse"});
    //https://www.earthcamtv.com/
    streamsFound.push({ id: 7, url: "https://strmr5.sha.maryland.gov/rtplive/9d00119e00770051004de33696235daa/chunklist_w1558685567.m3u8", videoType: "application/vnd.apple.mpegurl", name: "Earthcam TV"});

    streamsFound.push({ id: 8, url: "https://5d68870966db6.streamlock.net/EzeAppCameras/KTCamera.stream/chunklist_w117724110.m3u8", videoType: "application/vnd.apple.mpegurl", name: "Kambodscha"});


    streamsFound.push({id: 10, url: "https://wzmedia.dot.ca.gov/D3/80_crystal_springs.stream/chunklist_w400128743.m3u8",videoType: "application/x-mpegURL", name: "Hwy 80 at Crystal Springs"})
    streamsFound.push({id: 11, url: "https://wzmedia.dot.ca.gov/D3/5_seamas.stream/chunklist_w1800298206.m3u8",videoType: "application/x-mpegURL", name: "Hwy 5 at Seamas"})
    streamsFound.push({id: 12, url: "https://wzmedia.dot.ca.gov/D4/E12_EOF_Napa_County_Line.stream/chunklist_w616192674.m3u8",videoType: "application/x-mpegURL", name: "Fairfield"})
    streamsFound.push({id: 13, url: "https://wzmedia.dot.ca.gov/D4/W4_JWO_Railroad_Av.stream/chunklist_w2086500761.m3u8",videoType: "application/x-mpegURL", name: "Pittsburg"})
    streamsFound.push({id: 14, url: "https://wzmedia.dot.ca.gov/D4/W4_at_Contra_Loma_Bl_L_St.stream/chunklist_w1598218326.m3u8",videoType: "application/x-mpegURL", name: "Antioch"})


    return streamsFound;
  }
}
