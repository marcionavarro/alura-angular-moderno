import { Component } from '@angular/core';
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
  
  constructor(public formBuscaService: FormBuscaService) { }

  buscar() {
    console.log(this.formBuscaService.formBusca.value);
  }
}
