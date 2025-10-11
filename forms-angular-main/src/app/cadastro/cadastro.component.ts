import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ConsultaCepServiceService } from '../service/consulta-cep-service.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(
    private router: Router,
    private serviceCepService: ConsultaCepServiceService
  ) {
  }

  ngOnInit(): void {
  }

  cadastrar(form: NgForm) {
    return form.valid
      ? this.router.navigate(['./sucesso'])
      : alert('Formulário inválido')
  }

  consultaCEP(ev: any, f: NgForm) {
    const cep = ev.target.value;
    if (cep === '') return;

    return this.serviceCepService.getConsultaCep(cep)
      .subscribe(resultado => {
        this.populandoEndereco(resultado, f);
      });
  }

  populandoEndereco(dados: any, f: NgForm) {
    f.form.patchValue({
      endereco: dados.logradouro,
      complemento: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf
    });
  }
}
