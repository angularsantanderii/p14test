import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { CrearFacturaComponent } from './crear-factura.component';

describe('Componente para Crear Factura', () => {
  let component: CrearFacturaComponent;
  let fixture: ComponentFixture<CrearFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule // Añadimos dependencias que vaya a necesitar el código a testear
      ],
      declarations: [ CrearFacturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('El componente se crea correctamente', () => { // Test "propio" de Angular 
    expect(component).toBeTruthy();
  });

  it('Inclusión de campos de fecha y de tipo de IVA', () => {
    expect(component.formFactura.contains('fecha')).toBeTruthy();
    expect(component.formFactura.contains('tipoIVA')).toBeTruthy();
  })

  it('Campo cliente validación obligatoria', () => {
    const control = component.formFactura.get('cliente');
    control.patchValue('');
    expect(control.valid).toBeFalsy();
  })

});
