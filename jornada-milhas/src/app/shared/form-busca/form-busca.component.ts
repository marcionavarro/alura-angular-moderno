import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuscaService } from 'src/app/core/services/form-busca.service';

@Component({
  selector: 'app-form-busca',
  templateUrl: './form-busca.component.html',
  styleUrls: ['./form-busca.component.scss'],
})
export class FormBuscaComponent implements OnInit {
  dataIda: Date | null = null;
  dataVolta: Date | null = null;
  dataMinIda: Date = new Date();
  dataMinVolta?: Date = new Date();

  @Output() realizarBusca = new EventEmitter();

  constructor(public formBuscaService: FormBuscaService) { }

  ngOnInit(): void {
    this.dataMinimaVolta();
  }

  buscar() {
    if (this.formBuscaService.formEstaValido) {
      const formBuscaValue = this.formBuscaService.obterDadosDeBusca();
      this.realizarBusca.emit(formBuscaValue);
    } else {
      alert('Preencha os campos ');
    }
  }

  private dataMinimaVolta() {
    this.formBuscaService.formBusca.get('dataIda')?.valueChanges.subscribe((novaDataIda: Date) => {
      if (novaDataIda) {
        const dataVolta = this.formBuscaService.formBusca.get('dataVolta')?.value;
        this.dataMinVolta = novaDataIda;

        if (dataVolta && dataVolta < novaDataIda) {
          this.formBuscaService.formBusca.get('dataVolta')?.setValue(null);
        }
      } else {
        this.dataMinVolta = undefined;
      }
    });
  }
}
