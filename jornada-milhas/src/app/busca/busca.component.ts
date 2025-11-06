import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { FormBuscaService } from 'src/app/core/services/form-busca.service';
import { DadosBusca, Destaques, Passagem } from 'src/app/core/types/types';
import { PassagensService } from './services/passagens.service';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.scss']
})
export class BuscaComponent implements OnInit {
  passagens: Passagem[] = [];
  destaques?: Destaques;

  constructor(
    private passagensService: PassagensService,
    private formBuscaService: FormBuscaService
  ) { }

  ngOnInit(): void {
    const buscaPadrao: DadosBusca = {
      dataIda: new Date().toISOString(),
      pagina: 1,
      porPagina: 25,
      somenteIda: false,
      passageirosAdultos: 1,
      tipo: 'Executiva'
    };

    const busca = this.formBuscaService.formEstaValido ? this.formBuscaService.obterDadosDeBusca() : buscaPadrao;

    this.passagensService.getPassagens(busca)
      .pipe(take(1))
      .subscribe(res => {
        console.log("🚀 ~ BuscaComponent ~ ngOnInit ~ res:", res);
        this.passagens = res.resultado,
          this.formBuscaService.formBusca.patchValue({
            precoMin: res.precoMin,
            precoMax: res.precoMax,
          });
        this.obterDestaques();
      });
  }

  busca(event: DadosBusca) {
    this.passagensService.getPassagens(event)
      .subscribe(res => this.passagens = res.resultado);
  }

  private obterDestaques() {
    this.destaques = this.passagensService.obterPassagensDestaques(this.passagens);
    console.log("🚀 ~ BuscaComponent ~ obterDestaques ~ this.destaques:", this.destaques);
  }
}
