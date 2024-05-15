import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysequipmentAssociationComponent } from './sysequipment-association.component';

describe('SysequipmentAssociationComponent', () => {
  let component: SysequipmentAssociationComponent;
  let fixture: ComponentFixture<SysequipmentAssociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SysequipmentAssociationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SysequipmentAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
