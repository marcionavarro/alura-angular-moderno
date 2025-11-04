import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormularioService } from 'src/app/core/services/formulario.service';

import { PessoaUsuaria } from 'src/app/core/types/types';
import { TokenService } from '../services/token.service';
import { CadastroService } from '../services/cadastro-service.';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  titulo: string = 'Olá ';
  textoBotao: string = 'ATUALIZAR';
  perfilComponent: boolean = true;

  token: string = '';
  nome: string = '';
  cadastro!: PessoaUsuaria;
  form!: FormGroup<any> | null;

  constructor(
    private tokenService: TokenService,
    private cadastroService: CadastroService,
    private formularioService: FormularioService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.token = this.tokenService.retornarToken();
    this.cadastroService.buscarCadastro().subscribe(cadastro => {
      this.cadastro = cadastro;
      this.nome = this.cadastro.nome;
      this.carregarFormulario();
    });
  }

  carregarFormulario() {
    this.form = this.formularioService.getCadastro();
    this.form?.patchValue({
      nome: this.cadastro.nome,
      nascimento: this.cadastro.nascimento,
      cpf: this.cadastro.cpf,
      telefone: this.cadastro.telefone,
      email: this.cadastro.email,
      senha: this.cadastro.senha,
      genero: this.cadastro.genero,
      cidade: this.cadastro.cidade,
      estado: this.cadastro.estado
    });
  }

  atualizar() {
    const dadosAtualizados = {
      nome: this.form?.value.nome,
      nascimento: this.form?.value.nascimento,
      cpf: this.form?.value.cpf,
      telefone: this.form?.value.telefone,
      email: this.form?.value.email,
      senha: this.form?.value.senha,
      genero: this.form?.value.genero,
      cidade: this.form?.value.cidade,
      estado: this.form?.value.estado
    }
    this.cadastroService.editarCadastro(dadosAtualizados)
      .subscribe({
        next: () => {
          alert('Cadastro editado com sucesso!');
          this.router.navigate(['/perfil'])
        },
        error: (err) => console.log("🚀 ~ PerfilComponent ~ atualizar ~ err:", err)
      })
  }

  deslogar() {
    this.userService.logout();
    this.router.navigate(['/']);
  }

}
