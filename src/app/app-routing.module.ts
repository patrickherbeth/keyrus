import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DebtCreateComponent } from './debt-create/debt-create.component';
import { DebtListComponent } from './debt-list/debt-list.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'debt-create', component: DebtCreateComponent },
  { path: 'debt-list', component: DebtListComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Usando forRoot para configurar as rotas
  exports: [RouterModule]
})
export class AppRoutingModule { }
