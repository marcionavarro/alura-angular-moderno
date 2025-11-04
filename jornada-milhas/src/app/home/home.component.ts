import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Promocao } from 'src/app/core/types/types';
import { PromocaoService } from './services/promocao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  promocoes!: Promocao[];

  constructor(
    private servicoPromocao: PromocaoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.servicoPromocao.listar()
      .subscribe(res => {
        console.log("🚀 ~ HomeComponent ~ ngOnInit ~ res:", res)
        this.promocoes = res
      });
  }

  navegarParaBusca(event: any) {
    this.router.navigate(['busca'])
  }

}