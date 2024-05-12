import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipSystemFormComponent } from './ship-system-form.component';

describe('ShipSystemFormComponent', () => {
  let component: ShipSystemFormComponent;
  let fixture: ComponentFixture<ShipSystemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShipSystemFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShipSystemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
