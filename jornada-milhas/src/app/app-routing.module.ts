import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './autenticacao/auth.guard';
import { CadastroComponent } from './autenticacao/cadastro/cadastro.component';
import { LoginComponent } from './autenticacao/login/login.component';
import { PerfilComponent } from './autenticacao/perfil/perfil.component';
import { HomeComponent } from './home/home.component';
import { BuscaComponent } from './busca/busca.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cadastro',
    component: CadastroComponent
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [authGuard]
  },
  {
    path: 'busca',
    component: BuscaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
