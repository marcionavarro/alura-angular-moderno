import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cabecalho',
  standalone: true,
  imports: [],
  template: `
<header class="banner">
  <img [src]="src" [alt]="alt" />
</header>
  `,
  styles: [`
.banner img {
  width: 100%;
}
  `]
})
export class CabecalhoComponent {
  @Input() src = '';
  @Input() alt = '';
}