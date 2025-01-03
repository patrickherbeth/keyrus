import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Debt } from '../models/debt';

@Injectable({
  providedIn: 'root',
})
export class DebtService {
  private apiUrl = 'http://localhost:8081/api/debts'; // Ajuste para o URL do backend

  constructor(private http: HttpClient) {}

  getAllDebts(userId: number): Observable<Debt[]> {
    return this.http.get<Debt[]>(`${this.apiUrl}/all-bts/${userId}`);
  }

  createDebt(debt: Debt): Observable<Debt> {
    console.log("debt -> ", debt);
    return this.http.post<Debt>(`${this.apiUrl}/create`, debt);
  }

  updateDebt(id: number, debt: Debt): Observable<Debt> {
    return this.http.put<Debt>(`${this.apiUrl}/update/${id}`, debt);
  }

  deleteDebt(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  getDashboardSummary(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard-summary`);
  }
}
