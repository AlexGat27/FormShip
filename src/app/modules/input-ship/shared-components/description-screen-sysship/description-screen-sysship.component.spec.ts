import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionScreenSysshipComponent } from './description-screen-sysship.component';

describe('DescriptionScreenSysshipComponent', () => {
  let component: DescriptionScreenSysshipComponent;
  let fixture: ComponentFixture<DescriptionScreenSysshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DescriptionScreenSysshipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DescriptionScreenSysshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
