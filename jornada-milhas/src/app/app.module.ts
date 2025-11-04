import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';


// Para registrar o locale
import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';


import { AutenticacaoInterceptor } from './core/interceptors/autenticacao.interceptor';
import { BuscaComponent } from './pages/busca/busca.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { DepoimentosComponent } from './pages/home/depoimentos/depoimentos.component';
import { PromocoesComponent } from './pages/home/promocoes/promocoes.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './core/material/material.module';
registerLocaleData(localePt);

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CadastroComponent,
    DepoimentosComponent,
    PromocoesComponent,
    PerfilComponent,
    BuscaComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AutenticacaoInterceptor,
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
