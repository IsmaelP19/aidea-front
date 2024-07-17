import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class DialogService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(
    message: string,
    config?: {
      action?: string;
      duration?: number;
    }
  ) {
    return this.snackBar.open(message, (config && config.action) || 'Aceptar', {
      duration: config && config.duration !== undefined ? config.duration : undefined,
    });
  }


}