import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BannerComponent } from './shared/banner/banner.component';
import { CardBuscaComponent } from './shared/card-busca/card-busca.component';
import { CardDepoimentoComponent } from './shared/card-depoimento/card-depoimento.component';
import { CardComponent } from './shared/card/card.component';
import { ContainerComponent } from './shared/container/container.component';
import { FooterComponent } from './shared/footer/footer.component';
import { FormBuscaComponent } from './shared/form-busca/form-busca.component';
import { HeaderComponent } from './shared/header/header.component';

// Para registrar o locale
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { BotaoControleComponent } from './shared/botao-controle/botao-controle.component';
import { FormBaseComponent } from './shared/form-base/form-base.component';

import { DropdownUfComponent } from './shared/dropdown-uf/dropdown-uf.component';
import { ModalComponent } from './shared/modal/modal.component';
import { SeletorPassageiroComponent } from './shared/seletor-passageiro/seletor-passageiro.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { DepoimentosComponent } from './pages/home/depoimentos/depoimentos.component';
import { PromocoesComponent } from './pages/home/promocoes/promocoes.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
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
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    CardComponent,
    ContainerComponent,
    HomeComponent,
    CardBuscaComponent,
    CardDepoimentoComponent,
    FormBuscaComponent,
    ModalComponent,
    BotaoControleComponent,
    DropdownUfComponent,
    SeletorPassageiroComponent,
    LoginComponent,
    FormBaseComponent,
    CadastroComponent,
    DepoimentosComponent,
    PromocoesComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatButtonToggleModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatRadioModule,
     MatDividerModule,
    MatCheckboxModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
