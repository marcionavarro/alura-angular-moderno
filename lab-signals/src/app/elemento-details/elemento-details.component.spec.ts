import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementoDetailsComponent } from './elemento-details.component';

describe('ElementoDetailsComponent', () => {
  let component: ElementoDetailsComponent;
  let fixture: ComponentFixture<ElementoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElementoDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
