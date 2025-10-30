import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatChipSelectionChange } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class FormBuscaService {

  formBusca: FormGroup;

  constructor(private dialog: MatDialog) {
    this.formBusca = new FormGroup({
      somenteIda: new FormControl(false),
      origem: new FormControl(null),
      destino: new FormControl(null),
      tipo: new FormControl("Economica"),
      adultos: new FormControl(1),
      criancas: new FormControl(0),
      bebes: new FormControl(0),
      dataIda: new FormControl<Date | null>(null),
      dataVolta: new FormControl<Date | null>(null),
    });
  }

  getDescricaoDePassageiros(): string {
    let descricao = '';
    const adultos = this.formBusca.get('adultos')?.value;
    const criancas = this.formBusca.get('criancas')?.value;
    const bebes = this.formBusca.get('bebes')?.value;

    if (adultos && adultos > 0) {
      descricao += `${adultos} adulto${adultos > 1 ? 's' : ''}`;
    }

    if (criancas && criancas > 0) {
      descricao += `${descricao ? ', ' : ''} ${criancas} criança${criancas > 1 ? 's' : ''}`;
    }

    if (bebes && bebes > 0) {
      descricao += `${descricao ? ', ' : ''} ${bebes} bebe${bebes > 1 ? 's' : ''}`;
    }

    return descricao;
  }

  obterControle(nome: string): FormControl {
    const control = this.formBusca.get(nome);
    if (!control) {
      throw new Error(`FormControl com o nome ${nome} não encontrado.`)
    }
    return control as FormControl;
  }

  alterarTipo(evento: MatChipSelectionChange, tipo: string) {
    if (evento.selected) {
      this.formBusca.patchValue({ tipo });
    }
  }

  openDialog() {
    this.dialog.open(ModalComponent, {
      width: '50%'
    });
  }
}
