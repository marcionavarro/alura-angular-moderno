import { Component, Input, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.css']
})
export class PensamentoComponent implements OnInit {
  iconeFavorito: string = ''; 

  @Input() pensamento: Pensamento = {
    id: 0,
    conteudo: 'I Love Angular',
    autoria: 'Mn',
    modelo: 'modelo3',
    favorito: false
  }

  constructor(private service: PensamentoService) { }

  ngOnInit(): void {
    this.mudarIconeFavorito();
  }

  larguraPensamento(): string {
    if (this.pensamento.conteudo.length >= 256) {
      return 'pensamento-g';
    }
    return 'pensamento-p'
  }

  mudarIconeFavorito(): void {
    this.iconeFavorito = this.pensamento.favorito ? 'ativo' : 'inativo'
  }

  atualizarFavoritos() {
    this.service.mudarFavorito(this.pensamento).subscribe();
    this.mudarIconeFavorito();
  }

}
