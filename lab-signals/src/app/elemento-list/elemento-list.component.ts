import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Elemento, ElementoService } from '../elemento.service';

@Component({
  selector: 'app-elemento-list',
  templateUrl: './elemento-list.component.html',
  styleUrls: ['./elemento-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElementoListComponent {
  constructor(protected elementoService: ElementoService) {}

  selectionarElemento(elemento: Elemento) {
    this.elementoService.selecionarElemento(elemento);
  }

  alternarFavorito(elemento: Elemento) {
    if (this.elementoService.obterFavoritos().includes(elemento)) {
      this.elementoService.removerFavoritos(elemento);
    } else {
      this.elementoService.adicionarFavorito(elemento);
    }
  }
}
