import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipModelComponent } from './ship-model.component';

describe('ShipModelComponent', () => {
  let component: ShipModelComponent;
  let fixture: ComponentFixture<ShipModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShipModelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShipModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
