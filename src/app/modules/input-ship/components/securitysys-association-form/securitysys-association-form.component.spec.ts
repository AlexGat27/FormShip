import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuritysysAssociationFormComponent } from './securitysys-association-form.component';

describe('SecuritysysAssociationFormComponent', () => {
  let component: SecuritysysAssociationFormComponent;
  let fixture: ComponentFixture<SecuritysysAssociationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SecuritysysAssociationFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecuritysysAssociationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
