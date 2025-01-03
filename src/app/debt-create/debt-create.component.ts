import { Component, Output, EventEmitter } from '@angular/core';
import { DebtService } from '../services/debt.service';
import { Debt } from '../models/debt';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DebtUpdateService } from '../services/debt-update.service'; // Importando o serviço

@Component({
  selector: 'app-debt-create',
  standalone: true,
  templateUrl: './debt-create.component.html',
  styleUrls: ['./debt-create.component.css'],
  imports: [FormsModule]
})
export class DebtCreateComponent {
  debt: Debt = {
    userId: 0,
    title: '',
    amount: 0,
    dueDate: new Date(),
    status: 'Pendente',
    observations: '',
  };
  @Output() debtCreated = new EventEmitter<unknown>();

  constructor(
    private debtService: DebtService,
    private router: Router,
    private debtUpdateService: DebtUpdateService // Injetando o serviço
  ) {}

  createDebt() {
    const userDTOString = localStorage.getItem("userDTO");

    if (typeof userDTOString === "string") {
      this.debt.userId = Number(JSON.parse(userDTOString).id);
    }

    console.log("debt", this.debt);

    this.debtService.createDebt(this.debt).subscribe({
      next: () => {
        console.log("Dívida criada com sucesso!");
        this.debtUpdateService.notifyDebtUpdated(); // Notificando que a dívida foi criada
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error("Erro ao criar dívida:", err);
      }
    });
  }
}
