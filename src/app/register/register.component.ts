import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    FormsModule
  ]
})
export class RegisterComponent {
  user: User = { username: '', passwordHash: '' };

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.user.username, this.user.passwordHash).subscribe(() => {
      this.router.navigate(['/register']);
    });
  }

}
