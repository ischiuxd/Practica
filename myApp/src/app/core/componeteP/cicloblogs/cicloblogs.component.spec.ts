import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CicloblogsComponent } from './cicloblogs.component';

describe('CicloblogsComponent', () => {
  let component: CicloblogsComponent;
  let fixture: ComponentFixture<CicloblogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CicloblogsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CicloblogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
