import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {DebtListComponent} from './debt-list/debt-list.component';
import {DebtCreateComponent} from './debt-create/debt-create.component';
import {RegisterComponent} from './register/register.component';
import {FormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';


@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppComponent,
    DebtListComponent,
    DebtCreateComponent,
    RegisterComponent,
    LoginComponent,
    FormsModule

  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
