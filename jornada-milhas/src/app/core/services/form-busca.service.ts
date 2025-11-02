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
      dataVolta,
      conexoes: new FormControl(null),
      companhias: new FormControl(null),
      precoMin: new FormControl(null),
      precoMax: new FormControl(null),
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

  trocarOrigemDestino(): void {
    const origem = this.formBusca.get('origem')?.value;
    const destino = this.formBusca.get('destino')?.value;

    this.formBusca.patchValue({
      origem: destino,
      destino: origem
    });
  }

  obterControle<T>(nome: string): FormControl {
    const control = this.formBusca.get(nome);
    if (!control) {
      throw new Error(`FormControl com o nome ${nome} não encontrado.`)
    }
    return control as FormControl<T>;
  }

  obterDadosDeBusca(): DadosBusca {
    const somenteIda = this.obterControleNameValue<boolean>('somenteIda');
    const passageirosAdultos = this.obterControleNameValue<boolean>('adultos');
    const passageirosCriancas = this.obterControleNameValue<boolean>('criancas');
    const tipo = this.obterControleNameValue<boolean>('tipo');
    const passageirosBebes = this.obterControleNameValue<boolean>('bebes');
    const origemId = this.obterControleNameValue<any>('origem').id;
    const destinoId = this.obterControleNameValue<any>('destino').id;
    const dataIda = new Date(this.obterControleNameValue<Date>('dataIda')).toISOString() || null;
    const dataVolta = this.obterControleNameValue<Date>('dataVolta') && new Date(this.obterControleNameValue<Date>('dataVolta')).toISOString() || null;

    const dadosBusca: DadosBusca = {
      pagina: 1,
      porPagina: 20,
      somenteIda,
      passageirosAdultos,
      passageirosCriancas,
      passageirosBebes,
      tipo,
      origemId,
      destinoId,
      dataIda,
      dataVolta
    }

    const conexoesControl = this.obterControleNameValue('conexoes');
    if (conexoesControl) {
      dadosBusca.conexoes = conexoesControl;
    }
    const companhiasControl = this.obterControle<number[]>('companhias');
    if (companhiasControl.value) {
      dadosBusca.companhiasId = companhiasControl.value
    }
    const precoMinControl = this.obterControle<number[]>('precoMin');
    if (precoMinControl.value) {
      dadosBusca.precoMin = precoMinControl.value
    }
    const precoMaxControl = this.obterControle<number[]>('precoMax');
    if (precoMaxControl.value) {
      dadosBusca.precoMax = precoMaxControl.value
    }

    return dadosBusca;
  }

  alterarTipo(evento: MatChipSelectionChange, tipo: string) {
    if (evento.selected) {
      this.formBusca.patchValue({ tipo });
    }
  }

  dataVoltaMinima(dataMinVolta: Date) {
    console.log("🚀 ~ FormBuscaService ~ dataVoltaMinima ~ dataMinVolta:", dataMinVolta)
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

  private obterControleNameValue<T>(name: string) {
    return this.obterControle<T>(name).value || null;
  }
}
