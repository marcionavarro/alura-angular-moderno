import { Component, OnInit } from '@angular/core';
import { PromocaoService } from 'src/app/core/services/promocao.service';
import { Promocao } from 'src/app/core/types/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  promocoes!: Promocao[];
  isMultipleOfFour: boolean = false;

  constructor(private servicoPromocao: PromocaoService) { }

  ngOnInit(): void {
    this.servicoPromocao.listar()
      .subscribe(res => {
        this.promocoes = res;
        this.isMultipleOfFour = this.promocoes.length % 4 === 0;
        console.log('Promocoes:', this.promocoes.length, 'isMultipleOfFour:', this.isMultipleOfFour);
      });
  }

}