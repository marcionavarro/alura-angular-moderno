import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuscaService } from 'src/app/core/services/form-busca.service';

@Component({
  selector: 'app-form-busca',
  templateUrl: './form-busca.component.html',
  styleUrls: ['./form-busca.component.scss'],
})
export class FormBuscaComponent {
  dataIda: Date | null = null;
  dataVolta: Date | null = null;
  dataMinima: Date = new Date();

  @Output() realizarBusca = new EventEmitter();

  constructor(public formBuscaService: FormBuscaService) { }

  buscar() {
    if (this.formBuscaService.formEstaValido) {
      const formBuscaValue = this.formBuscaService.obterDadosDeBusca();
      this.realizarBusca.emit(formBuscaValue);
    } else {
      alert('Preencha os campos ')
    }
  }
}
