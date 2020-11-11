import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundsComponent } from './sounds.component';

describe('SoundsComponent', () => {
  let component: SoundsComponent;
  let fixture: ComponentFixture<SoundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoundsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
