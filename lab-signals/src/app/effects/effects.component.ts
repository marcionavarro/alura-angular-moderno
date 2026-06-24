import { Component, effect, signal } from '@angular/core';
import { Elemento, ElementoService } from '../elemento.service';

@Component({
  selector: 'app-effects',
  templateUrl: './effects.component.html',
  styleUrls: ['./effects.component.css'],
})
export class EffectsComponent {
  constructor(protected elementoService: ElementoService) {}

  selecionarElemento(elemento: Elemento) {
    this.elementoService.selecionarElemento(elemento);
  }

  ajustarTemperatura(novaTemperatura: number) {
    this.elementoService.ajustarTemperatura(novaTemperatura);
  }
}
