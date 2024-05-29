import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectionFormComponent } from './protection-form.component';

describe('ProtectionFormComponent', () => {
  let component: ProtectionFormComponent;
  let fixture: ComponentFixture<ProtectionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProtectionFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProtectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
