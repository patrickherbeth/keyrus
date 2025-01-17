import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';  // Importando AppRoutingModule
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(AppRoutingModule, FormsModule),  // Importando AppRoutingModule
    provideHttpClient(withInterceptorsFromDi()), provideAnimationsAsync() // Adiciona suporte ao HttpClient e interceptores
  ]
});

