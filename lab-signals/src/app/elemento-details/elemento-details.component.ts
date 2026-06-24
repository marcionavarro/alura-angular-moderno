import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ElementoService } from '../elemento.service';

@Component({
  selector: 'app-elemento-details',
  templateUrl: './elemento-details.component.html',
  styleUrls: ['./elemento-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElementoDetailsComponent {
  constructor(protected elementoService: ElementoService) {}
}
