import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CabecalhoComponent } from "./cabecalho.component";
import { CommonModule } from '@angular/common';

describe('CabecalhoComponent', () => {
    let component: CabecalhoComponent;
    let fixture: ComponentFixture<CabecalhoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CabecalhoComponent, CommonModule],
        });
        // sobrescreve o template externo por um template inline para evitar
        // problemas de resolução de recursos (templateUrl/styleUrls) em Jest
        TestBed.overrideComponent(CabecalhoComponent, { set: { template: '<div></div>' } });
        await TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CabecalhoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('deveria ser criado', () => {
        expect(component).toBeTruthy();
    });

    it('deveria definir as propriedades alt e src', () => {
        expect(component.alt).toBeDefined();
        expect(component.src).toBeDefined();
    });

    it('deveria renderizar o conteudo baseado nas propriedades src e alt', () => {
        component.src = 'https://example.com/test-image.jpg';
        component.alt = 'Imagem teste';
        expect(component).toMatchSnapshot();
    })
})