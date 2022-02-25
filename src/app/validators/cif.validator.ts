import { AbstractControl } from "@angular/forms";

export function ValidadorCif(control: AbstractControl) {

    let isValidLetraCif: boolean = false;

    if(control.value.charAt(0).toUpperCase().match(/^([ABCDEFGHPQSKLMX])$/)) {
        isValidLetraCif = true;
    }

    if (!isValidLetraCif) {
        return {invalidCif: true, mensaje: 'La letra del CIF no es válida'};
    } else if (control.value.length !== 9) {
        return {invalidCif: true, mensaje: 'El CIF debe tener 9 caracteres'};
    }

    return null

}