import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { ErroRoutingModule } from './erro-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PaginaNaoEncontradaComponent,
  ],
  imports: [
    CommonModule,
    ErroRoutingModule,
    RouterModule,
    SharedModule
  ]
})
export class ErroModule { }
