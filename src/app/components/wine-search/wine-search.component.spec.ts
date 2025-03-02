import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WineSearchComponent } from './wine-search.component';

describe('WineSearchComponent', () => {
  let component: WineSearchComponent;
  let fixture: ComponentFixture<WineSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WineSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WineSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
