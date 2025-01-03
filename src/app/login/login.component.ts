import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {UserDTO} from '../dto/UserDTO';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    FormsModule,
    NgIf
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    username: '',
    password: ''
  };

  errorMessage: string | null = null;
  tokenKey = 'auth_token';  // Definindo o tokenKey
  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.user.username, this.user.password).subscribe({
      next: (userDTO) => {
        console.log("userDTO", userDTO);
        if (userDTO) {
          // Armazena informações do usuário, se necessário
          localStorage.setItem('userDTO', userDTO);

          // Redireciona para a página do dashboard
          this.router.navigate(['/dashboard']);
        } else {
          console.error('Login falhou: Nenhum usuário encontrado');
          this.errorMessage = 'Login falhou. Usuário não encontrado.';
        }
      },
      error: (err: any) => {
        this.errorMessage = 'Login failed. Please check your credentials.';
        console.error(err); // Exibe o erro completo no console
      }
    });
  }


  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
