import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, Observable, throwError} from 'rxjs';
import { AuthResponse } from '../models/auth-response'; // Modelo para a resposta de autenticação
import { environment } from '../../environments/environment';
import {UserDTO} from '../dto/UserDTO';
import {User} from '../models/user';
import {Router} from '@angular/router'; // Para usar o URL base configurado

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'authToken'; // Chave para armazenar o token no localStorage
  private apiUrl = `${environment.apiUrl}/api/auth`; // Usando variável de ambiente para o URL base


  constructor(private http: HttpClient, private router: Router) {}

  // Método de registro
  register(username: string, password: string): Observable<User> {
    // Criando o UserDTO para enviar
    const userDTO: { username: string; password: string } = {
      username,
      password,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<User>(`${this.apiUrl}/register`, userDTO, { headers })
      .pipe(
        catchError((error) => {
          console.error('Erro ao registrar usuário:', error);
          return throwError(() => new Error('Falha no registro. Tente novamente.'));
        })
      );
  }


  // Método para armazenar o token no localStorage (caso necessário)
  storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Método para obter o token do localStorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }, { responseType: 'text' as 'json' }).pipe(
      map((response: any) => {
        // Se a resposta for um texto com "Login successful" e o token estiver em algum lugar
        if (response === 'Login successful') {
          // Supondo que você receba o token de outra forma ou de outra chamada
          // Aqui você pode alterar o código para recuperar o token de onde for necessário
          const token = 'seuTokenAqui'; // Substitua por como você obtém o token
          localStorage.setItem('tokenKey', token); // Armazena o token no localStorage
        }
        return response;  // Retorna a resposta para o subscriber
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => new Error('Failed to login. Please try again.'));
      })
    );
  }




  // Verifica se o usuário está logado
  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return !!token; // Retorna verdadeiro se o token existir, falso caso contrário
  }


  // Método para salvar o token após login
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Método para remover o token ao deslogar
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
