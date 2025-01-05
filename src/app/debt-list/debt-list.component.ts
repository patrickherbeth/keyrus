import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import { CurrencyPipe, DatePipe } from "@angular/common";
import { Subscription } from 'rxjs';
import { DebtService } from '../services/debt.service';
import { DebtUpdateService } from '../services/debt-update.service';
import { Debt } from '../models/debt';
import {MatButton} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-debt-list',
  templateUrl: './debt-list.component.html',
  imports: [
    MatPaginator,
    MatTable,
    CurrencyPipe,
    DatePipe,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatButton,
    MatIconModule,
    MatHeaderRowDef,
    MatRowDef,
    MatCellDef,
    MatHeaderCellDef,
    // Certifique-se de incluir aqui
  ],
  styleUrls: ['./debt-list.component.css']
})
export class DebtListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['title', 'amount', 'dueDate', 'status', 'actions'];
  dataSource = new MatTableDataSource<Debt>([]);
  debts: Debt[] = []; // Armazena todas as dívidas
  totalDebts = 0;
  debtUpdatedSubscription: Subscription | undefined; // Observável para atualizações
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
      private debtService: DebtService,
      private debtUpdateService: DebtUpdateService
  ) {}

  ngOnInit(): void {
    // Inscreve-se no evento de atualização de dívidas
    this.debtUpdatedSubscription = this.debtUpdateService.debtUpdated$.subscribe(updated => {
      if (updated) {
        this.updateDebtList(); // Atualiza a lista de dívidas
        this.debtUpdateService.resetDebtUpdate(); // Reseta a notificação
      }
    });

    // Carrega as dívidas ao inicializar
    this.updateDebtList();
  }

  ngAfterViewInit(): void {
    // Associa o paginator à tabela após a inicialização da view
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  updateDebtList(): void {
    const userDTOString = localStorage.getItem("userDTO");
    let userId: number = 0;
    if (typeof userDTOString === "string") {
      userId = Number(JSON.parse(userDTOString).id);
    }

    // Obtém todas as dívidas do usuário
    this.debtService.getAllDebts(userId).subscribe((debts) => {
      this.debts = debts;
      this.dataSource.data = this.debts;
      this.totalDebts = this.debts.length;

      // Atualiza o paginator, se necessário
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  deleteDebt(id: number | undefined): void {
    if (id !== undefined) {
      this.debtService.deleteDebt(id).subscribe(() => {
        this.debts = this.debts.filter((debt) => debt.id !== id);
        this.dataSource.data = this.debts;
        this.totalDebts = this.debts.length;

        // Atualiza o paginator, se necessário
        if (this.paginator) {
          this.paginator.firstPage();
        }

        // Notifica que houve uma atualização
        this.debtUpdateService.notifyDebtUpdated();
      });
    } else {
      console.error('Tentativa de excluir uma dívida sem ID definido.');
    }
  }

  ngOnDestroy(): void {
    // Desinscreve-se do observável ao destruir o componente
    if (this.debtUpdatedSubscription) {
      this.debtUpdatedSubscription.unsubscribe();
    }
  }
}
