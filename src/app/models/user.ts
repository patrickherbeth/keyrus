export interface User {
  id?: number;          // Opcional, pois é gerado automaticamente no backend
  username: string;     // Nome de usuário
  passwordHash: string; // Senha (hashed no backend)
}
