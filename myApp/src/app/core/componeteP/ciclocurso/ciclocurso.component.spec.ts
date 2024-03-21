import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiclocursoComponent } from './ciclocurso.component';

describe('CiclocursoComponent', () => {
  let component: CiclocursoComponent;
  let fixture: ComponentFixture<CiclocursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiclocursoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CiclocursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
