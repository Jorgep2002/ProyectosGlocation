import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalizarProyectoComponent } from './analizar-proyecto.component';

describe('AnalizarProyectoComponent', () => {
  let component: AnalizarProyectoComponent;
  let fixture: ComponentFixture<AnalizarProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalizarProyectoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalizarProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
