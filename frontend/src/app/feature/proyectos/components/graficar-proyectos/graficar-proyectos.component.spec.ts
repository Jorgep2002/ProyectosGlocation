import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficarProyectosComponent } from './graficar-proyectos.component';

describe('GraficarProyectosComponent', () => {
  let component: GraficarProyectosComponent;
  let fixture: ComponentFixture<GraficarProyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficarProyectosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficarProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
