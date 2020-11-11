import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IframePlayerComponent } from './iframe-player.component';

describe('VideoIframeComponent', () => {
  let component: IframePlayerComponent;
  let fixture: ComponentFixture<IframePlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IframePlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IframePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
