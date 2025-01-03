import { Component, OnInit, OnDestroy } from '@angular/core';
import { DebtService } from '../services/debt.service';
import { Debt } from '../models/debt';
import { Subscription } from 'rxjs';
import { DebtUpdateService } from '../services/debt-update.service';
import { CurrencyPipe } from '@angular/common';
import {DebtListComponent} from '../debt-list/debt-list.component';
import {DebtCreateComponent} from '../debt-create/debt-create.component'; // Importando o CurrencyPipe para formatação

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [
    CurrencyPipe,
    DebtListComponent,
    DebtCreateComponent
  ],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  debts: Debt[] = [];
  totalDebts: number = 0;
  pendingDebts: number = 0; // Agora será o somatório dos valores das dívidas pendentes
  paidDebts: number = 0;
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


  // Método para atualizar a lista de dívidas
  updateDebtList() {
    const userDTOString = localStorage.getItem("userDTO");
    let userId: number = 0;
    if (typeof userDTOString === "string") {
      userId = Number(JSON.parse(userDTOString).id);
    }

    this.debtService.getAllDebts(userId).subscribe((debts) => {
      this.debts = debts;
      this.calculateSummary(); // Recalcula o resumo financeiro
    });
  }

  // Método para calcular o resumo financeiro
  calculateSummary() {
    this.totalDebts = this.debts.length;

    // Somando os valores das dívidas pendentes
    this.pendingDebts = this.debts
      .filter(debt => debt.status === 'Pendente') // Filtra as dívidas pendentes
      .reduce((total, debt) => total + debt.amount, 0); // Soma os valores das dívidas pendentes

    // Contagem das dívidas pagas
    this.paidDebts = this.debts.filter(debt => debt.status === 'Pago').length;
  }

  ngOnDestroy() {
    if (this.debtUpdatedSubscription) {
      this.debtUpdatedSubscription.unsubscribe(); // Desinscreve-se do observável
    }
  }
}
