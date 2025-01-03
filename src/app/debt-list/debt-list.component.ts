import { Component, OnInit, OnDestroy } from '@angular/core';
import { DebtService } from '../services/debt.service';
import { Debt } from '../models/debt';
import { Subscription } from 'rxjs';
import { DebtUpdateService } from '../services/debt-update.service';
import {CurrencyPipe, DatePipe, NgForOf} from '@angular/common'; // Importando o serviço

@Component({
  selector: 'app-debt-list',
  standalone: true,
  templateUrl: './debt-list.component.html',
  imports: [
    CurrencyPipe,
    DatePipe,
    NgForOf
  ],
  styleUrls: ['./debt-list.component.css']
})
export class DebtListComponent implements OnInit, OnDestroy {
  debts: Debt[] = [];
  debtUpdatedSubscription: Subscription | undefined; // Para se inscrever no evento de atualização

  constructor(
    private debtService: DebtService,
    private debtUpdateService: DebtUpdateService // Injetando o serviço
  ) {}

  ngOnInit() {
    this.debtUpdatedSubscription = this.debtUpdateService.debtUpdated$.subscribe(updated => {
      if (updated) {
        this.updateDebtList(); // Atualiza a lista de dívidas
        this.debtUpdateService.resetDebtUpdate(); // Reseta a notificação
      }
    });

    this.updateDebtList(); // Atualiza a lista de dívidas ao carregar o componente
  }

  updateDebtList() {
    const userDTOString = localStorage.getItem("userDTO");
    let userId: number = 0;
    if (typeof userDTOString === "string") {
      userId = Number(JSON.parse(userDTOString).id);
    }

    this.debtService.getAllDebts(userId).subscribe((debts) => {
      this.debts = debts;
    });
  }

  ngOnDestroy() {
    if (this.debtUpdatedSubscription) {
      this.debtUpdatedSubscription.unsubscribe(); // Desinscreve-se do observável
    }
  }

  deleteDebt(id: number | undefined) {
    if (id !== undefined) {
      this.debtService.deleteDebt(id).subscribe(() => {
        this.debts = this.debts.filter((debt) => debt.id !== id);
        this.debtUpdateService.notifyDebtUpdated(); // Notifica que houve uma atualização
      });
    } else {
      console.error('Tentativa de excluir uma dívida sem ID definido.');
    }
  }

}
