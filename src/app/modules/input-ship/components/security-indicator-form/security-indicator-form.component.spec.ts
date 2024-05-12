import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityIndicatorFormComponent } from './security-indicator-form.component';

describe('SecurityIndicatorFormComponent', () => {
  let component: SecurityIndicatorFormComponent;
  let fixture: ComponentFixture<SecurityIndicatorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SecurityIndicatorFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecurityIndicatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
