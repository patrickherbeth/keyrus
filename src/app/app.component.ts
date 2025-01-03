import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Importando RouterModule

@Component({
  selector: 'app-root',
  standalone: true, // Tornando o componente standalone
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule],  // Adicionando RouterModule aos imports do componente standalone
})
export class AppComponent {
  title = 'Minha Aplicação Angular';
}
