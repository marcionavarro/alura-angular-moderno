import { afterNextRender, Component, OnInit } from '@angular/core';

import { ProductsListComponent } from '../../components/products-list/products-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductsListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor() {
    afterNextRender(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          console.log('Aqui', position.coords.latitude)
        })
      } else {
        console.log('Erro ao obter localização');
      }
    })
  }

}
