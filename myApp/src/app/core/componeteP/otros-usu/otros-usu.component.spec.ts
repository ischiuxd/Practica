import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtrosUSUComponent } from './otros-usu.component';

describe('OtrosUSUComponent', () => {
  let component: OtrosUSUComponent;
  let fixture: ComponentFixture<OtrosUSUComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtrosUSUComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OtrosUSUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
