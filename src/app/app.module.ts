import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DebtListComponent } from './debt-list/debt-list.component';
import { DebtCreateComponent } from './debt-create/debt-create.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatOptionModule } from "@angular/material/core";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,  // Necessário para mat-form-field
    MatInputModule,      // Necessário para matInput
    MatButtonModule,     // Necessário para mat-raised-button
    MatSelectModule,     // Necessário para matNativeControl (select)
    MatDatepickerModule, // Necessário para datepicker
    MatNativeDateModule, // Necessário para datepicker
    MatOptionModule,
    AppComponent,
    DebtListComponent,
    DebtCreateComponent,
    RegisterComponent,
    LoginComponent,
    MatIconModule, // Adicione isto
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
