import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DebtUpdateService {
  private debtUpdatedSource = new BehaviorSubject<boolean>(false); // Inicialmente não houve atualização
  debtUpdated$ = this.debtUpdatedSource.asObservable(); // Observável

  // Método para emitir atualização
  notifyDebtUpdated() {
    this.debtUpdatedSource.next(true); // Notifica que houve uma atualização
  }

  // Método para resetar a notificação
  resetDebtUpdate() {
    this.debtUpdatedSource.next(false); // Reseta a atualização
  }
}
