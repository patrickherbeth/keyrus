export interface Debt {
  id?: number;          // Opcional, pois é gerado automaticamente no backend
  title: string;        // Título da dívida
  amount: number;       // Valor da dívida
  dueDate: Date;        // Data de vencimento
  status: string;       // Status (Pendente, Pago, Atrasado)
  observations?: string; // Observações (opcional)
  userId: number
}
