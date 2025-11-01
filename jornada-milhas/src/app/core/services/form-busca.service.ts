import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipSelectionChange } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { DadosBusca } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class FormBuscaService {

  formBusca: FormGroup;

  constructor(private dialog: MatDialog) {
    const somenteIda = new FormControl(false, [Validators.required]);
    const dataVolta = new FormControl<Date | null>(null, [Validators.required]);

    this.formBusca = new FormGroup({
      origem: new FormControl(null, [Validators.required]),
      destino: new FormControl(null, [Validators.required]),
      tipo: new FormControl("Econômica"),
      adultos: new FormControl(1),
      criancas: new FormControl(0),
      bebes: new FormControl(0),
      dataIda: new FormControl(null, [Validators.required]),
      somenteIda,
      dataVolta
    });
    this.somenteIdaValueChanges(somenteIda, dataVolta);
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

  obterControle<T>(nome: string): FormControl {
    const control = this.formBusca.get(nome);
    if (!control) {
      throw new Error(`FormControl com o nome ${nome} não encontrado.`)
    }
    return control as FormControl<T>;
  }

  obterDadosDeBusca(): DadosBusca {
    const rawDataIda = this.obterControle<Date>('dataIda').value;

    // Evita erro caso o campo esteja vazio ou não seja Date
    const dataIda = rawDataIda
      ? new Date(rawDataIda).toISOString()
      : null;

    const rawDataVolta = this.obterControle<Date>('dataVolta').value;
    const dataVolta = rawDataVolta
      ? new Date(rawDataVolta).toISOString()
      : null;

    const origem = this.obterControle<any>('origem').value;
    const destino = this.obterControle<any>('destino').value;

    const dadosBusca: DadosBusca = {
      pagina: 1,
      porPagina: 20,
      somenteIda: this.obterControle<boolean>('somenteIda').value,
      origemId: origem ? origem.id : null,     
      destinoId: destino ? destino.id : null,
      tipo: this.obterControle<boolean>('tipo').value,
      passageirosAdultos: this.obterControle<boolean>('adultos').value,
      passageirosCriancas: this.obterControle<boolean>('criancas').value,
      passageirosBebes: this.obterControle<boolean>('bebes').value,
      dataIda,
      dataVolta
    }
    return dadosBusca;
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

  get formEstaValido() {
    return this.formBusca.valid;
  }

  private somenteIdaValueChanges(somenteIda: FormControl, dataVolta: FormControl) {
    somenteIda.valueChanges.subscribe(somenteIda => {
      if (somenteIda) {
        dataVolta.disable();
        dataVolta.setValidators(null);
      } else {
        dataVolta.enable();
        dataVolta.setValidators([Validators.required]);
      }
      dataVolta.updateValueAndValidity();
    })
  }
}
