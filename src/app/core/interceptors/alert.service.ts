import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  showAlert(title: string, message: string): void {
    alert(`${title}\n${message}`);
  }
}
