import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionScreenComponent } from './description-screen.component';

describe('DescriptionScreenComponent', () => {
  let component: DescriptionScreenComponent;
  let fixture: ComponentFixture<DescriptionScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DescriptionScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DescriptionScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
