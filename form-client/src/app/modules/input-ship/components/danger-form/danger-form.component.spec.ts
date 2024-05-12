import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangerFormComponent } from './danger-form.component';

describe('DangerFormComponent', () => {
  let component: DangerFormComponent;
  let fixture: ComponentFixture<DangerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DangerFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DangerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
