import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RodapeComponent } from "./rodape.component"

describe('RodapeComponent', () => {
    let component: RodapeComponent;
    let fixture: ComponentFixture<RodapeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RodapeComponent]
        });
        TestBed.overrideComponent(RodapeComponent, { set: { template: '<div></div>' } });
        await TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RodapeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('deveria criar o componente', () => {
        expect(component).toBeTruthy();
    });

    it('deveria definir as propriedades alt e src', () => {
        expect(component.src).toBeDefined();
        expect(component.alt).toBeDefined();
    });

    it('deveria renderizar o conteúdo baseado nas propriedades src e alt', () => {
        component.src = 'https://example.com/test-image.jpg';
        component.alt = 'Imagem teste';
        expect(component).toMatchSnapshot();
    });
})