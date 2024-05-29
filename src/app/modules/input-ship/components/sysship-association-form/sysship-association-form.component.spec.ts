import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysshipAssociationFormComponent } from './sysship-association-form.component';

describe('SysshipAssociationFormComponent', () => {
  let component: SysshipAssociationFormComponent;
  let fixture: ComponentFixture<SysshipAssociationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SysshipAssociationFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SysshipAssociationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
