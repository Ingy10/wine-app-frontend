import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WineDisplayComponent } from './wine-display.component';

describe('WineDisplayComponent', () => {
  let component: WineDisplayComponent;
  let fixture: ComponentFixture<WineDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WineDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WineDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
