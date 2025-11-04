import { Component, OnInit } from '@angular/core';
import { Depoimento } from 'src/app/core/types/types';
import { DepoimentoService } from '../services/depoimentos.service';

@Component({
  selector: 'app-depoimentos',
  templateUrl: './depoimentos.component.html',
  styleUrls: ['./depoimentos.component.scss']
})
export class DepoimentosComponent implements OnInit {
  depoimentos: Depoimento[] = [];
  constructor(private service: DepoimentoService) { }

  ngOnInit(): void {
    this.service.listar().subscribe(res => this.depoimentos = res);
  }
}
