import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css']
})
export class EditarPensamentoComponent implements OnInit {
  formulario!: FormGroup;

  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: ''
  }
  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.pensamentoPorId();
  }

  editarPensamento() {
    const pensamentoAtualizado: Pensamento = {
      ...this.pensamento,
      ...this.formulario.value
    }
    this.service.editar(pensamentoAtualizado).subscribe(() => {
      console.log(pensamentoAtualizado)
      this.router.navigate(['listar-pensamento'])
    })
  }

  cancelar() {
    this.router.navigate(['listar-pensamento'])
  }

  habilitarBotao(): string {
    return this.formulario.valid
      ? 'botao'
      : 'botao__desabilitado'
  }

  private pensamentoPorId(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.buscarPorId(parseInt(id!)).subscribe((pensmento) => {
      this.pensamento = pensmento;
      this.validarFormulario();
    });
  }

 private validarFormulario() {
    this.formulario = this.formBuilder.group({
      conteudo: [this.pensamento.conteudo || "", Validators.compose([
        Validators.required,
        Validators.pattern(/(.|\s)*\s(.|\s)*/)
      ])],
      autoria: [this.pensamento.autoria || "", Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      modelo: [this.pensamento.modelo || "", [Validators.required]]
    })
  }

}
