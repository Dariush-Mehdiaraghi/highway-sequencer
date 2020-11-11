import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoIframeComponent } from './video-iframe.component';

describe('VideoIframeComponent', () => {
  let component: VideoIframeComponent;
  let fixture: ComponentFixture<VideoIframeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoIframeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
