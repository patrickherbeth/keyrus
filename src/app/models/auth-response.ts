export interface AuthResponse {
  token: string;         // Token JWT ou outro mecanismo de autenticação
  username: string;      // Nome de usuário retornado
  userId: number;        // ID do usuário
  message: string;
}
