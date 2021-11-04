import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackFooterComponent } from './black-footer.component';

describe('BlackFooterComponent', () => {
  let component: BlackFooterComponent;
  let fixture: ComponentFixture<BlackFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlackFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlackFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
