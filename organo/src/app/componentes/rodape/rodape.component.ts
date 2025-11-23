import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rodape',
  standalone: true,
  imports: [],
  template: `
    <footer class="banner">
      <img [src]="src" [alt]="alt" />
    </footer>
  `,
  styles: [`
    .rodape img{
      max-width: 100%;
    }

    .rodape {
      display: flex;
    }
  `]
})
export class RodapeComponent {
  @Input() src = '';
  @Input() alt = '';
}
