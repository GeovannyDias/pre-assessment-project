import { DatePipe } from '@angular/common';

const datePipe = new DatePipe('es-EC'); // Cambiar 'es-EC' por el locale que se necesite (config in main.ts)

export const formatDateTimeUsingPipe = (value: string | Date, format: string = 'dd/MM/yyyy HH:mm:ss'): string => {
    return datePipe.transform(value, format) ?? '';
}