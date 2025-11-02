import { Component, OnInit } from '@angular/core';
import { FormBuscaService } from 'src/app/core/services/form-busca.service';
import { PassagensService } from 'src/app/core/services/passagens.service';
import { DadosBusca, Passagem, Resultado } from 'src/app/core/types/types';

@Component({
  selector: 'app-card-destaque',
  templateUrl: './card-destaque.component.html',
  styleUrls: ['./card-destaque.component.scss']
})
export class CardDestaqueComponent implements OnInit {
  passagens: Passagem[] = [];
  passagemDeMenorPreco?: Passagem;
  passagemDeMenorTempo?: Passagem;
  passagemRecomendada?: Passagem;

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
    }

    const busca = this.formBuscaService.formEstaValido ? this.formBuscaService.obterDadosDeBusca() : buscaPadrao;

    this.passagensService.getPassagens(busca)
      .subscribe(res => {
        const passagens = res.resultado;

        if (passagens.length > 0) {
          this.passagemDeMenorPreco = this.encontrarMenorPreco(passagens);
          this.passagemDeMenorTempo = this.encontrarMenorTempo(passagens);
          this.passagemRecomendada = this.encontrarPassagemRecomendada(
            passagens,
            this.passagemDeMenorPreco?.total,
            this.passagemDeMenorTempo?.tempoVoo);
        }

        console.log("Menor Preço:", this.passagemDeMenorPreco);
        console.log("Menor Tempo:", this.passagemDeMenorTempo);
        console.log("Recomendada:", this.passagemRecomendada);
      });
  }

  // Função para calcular total da passagem
  private calcularTotal(passagem: Passagem): number {
    return passagem.precoIda + passagem.precoVolta + passagem.taxaEmbarque;
  }

  // Função para encontrar menor preço
  private encontrarMenorPreco(passagens: Passagem[]): any {
    return passagens.reduce((menor, atual) => {
      return this.calcularTotal(atual) < this.calcularTotal(menor) ? atual : menor;
    });
  }

  // Função para encontrar menor tempo
  private encontrarMenorTempo(passagens: Passagem[]): any {
    return passagens.reduce((menor, atual) => {
      return atual.tempoVoo < menor.tempoVoo ? atual : menor;
    });
  }

  // Função para encontrar passagem recomendada
  private encontrarPassagemRecomendada(passagens: Passagem[], menorPreco: any, menorTempo: any): any {
    return passagens.reduce((melhor, atual) => {
      const totalAtual = this.calcularTotal(atual);
      const totalMelhor = this.calcularTotal(melhor);

      const scoreAtual = totalAtual * 0.5 + atual.tempoVoo * 0.3 + this.diversidadeScore(atual, menorPreco, menorTempo);
      const scoreMelhor = totalMelhor * 0.5 + melhor.tempoVoo * 0.3 + this.diversidadeScore(melhor, menorPreco, menorTempo);

      return scoreAtual < scoreMelhor ? atual : melhor;
    });
  }

  // Penaliza passagens que já foram escolhidas como menor preço ou menor tempo
  private diversidadeScore(passagem: Passagem, menorPreco: any, menorTempo: any): number {
    let penalty = 0;
    if (passagem.total === menorPreco) penalty += 1000; // penaliza bastante
    if (passagem.tempoVoo === menorTempo) penalty += 1000; // penaliza bastante
    return penalty;
  }
}
