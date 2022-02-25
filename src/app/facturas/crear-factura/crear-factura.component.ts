import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidadorCif } from 'src/app/validators/cif.validator';
import Big from 'big-js';

@Component({
  selector: 'app-crear-factura',
  templateUrl: './crear-factura.component.html',
  styleUrls: ['./crear-factura.component.css']
})
export class CrearFacturaComponent implements OnInit {

  formFactura: FormGroup;
  user: any = {
    name: 'Laura',
    surname: 'Lopez',
    id: '8s6d8s6d8as',
    role: 'ventas'
  }

  constructor() { }

  ngOnInit(): void {
    this.formFactura = new FormGroup({
      cliente: new FormControl('', [Validators.required, Validators.minLength(4)]),
      cif: new FormControl('', [ValidadorCif]),
      fecha: new FormControl((new Date()).toISOString().substring(0,10)),
      baseImponible: new FormControl(0),
      tipoIVA: new FormControl(0.21),
      importeIVA: new FormControl(0),
      totalFactura: new FormControl(0)
    })
    this.actualizarFactura();
  }

  actualizarFactura() {
    this.formFactura.valueChanges
                    .subscribe(objetoForm => {
                      let importeIVA = 0;
                      let totalFactura = 0;
                      if(objetoForm.baseImponible !== null) {
                        importeIVA = new Big(objetoForm.baseImponible).times(objetoForm.tipoIVA);
                        totalFactura = new Big(objetoForm.baseImponible).add(importeIVA);
                      }
                      this.formFactura.get('importeIVA').patchValue(importeIVA, {emitEvent: false});
                      this.formFactura.get('totalFactura').patchValue(totalFactura, {emitEvent: false});
                    })
  }

  addFactura() {
    const {
      ['importeIVA']: removeImporteIVA,
      ['totalFactura']: removeTotalFactura,
      ...rest
    } = this.formFactura.value;
    const factura: any = { // Este objeto iría a servicio y probablemente deberá cumplir una interfaz
      ...rest,
      user: this.user,
      date: new Date()
    }
    console.log(factura);
  }

}
