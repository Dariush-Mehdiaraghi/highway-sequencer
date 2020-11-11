import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoBigComponent } from './video-big.component';

describe('VideoBigComponent', () => {
  let component: VideoBigComponent;
  let fixture: ComponentFixture<VideoBigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoBigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoBigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
