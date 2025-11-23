import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { LivroService } from "../../services/livro.service";
import { FormularioComponent } from "./formulario.component";

describe('FormularioComponent', () => {
    let component: FormularioComponent;
    let fixture: ComponentFixture<FormularioComponent>;
    let service: LivroService;

    beforeEach(async () => {
        // ensure queued template/style resources are resolved by the global helper
        if (typeof (global as any).__resolveTestResources === 'function') {
            await (global as any).__resolveTestResources();
        }

        await TestBed.configureTestingModule({
            imports: [FormularioComponent, ReactiveFormsModule, RouterLink],
            providers: [LivroService, { provide: FormBuilder, useClass: FormBuilder }]
        }).compileComponents();
    });

    beforeEach(() => {
        service = TestBed.inject(LivroService);
        // instantiate component manually to avoid TestBed DI issues with standalone compilation
        const fb = new FormBuilder();
        const mockRouter = { navigate: jest.fn() };
        component = new FormularioComponent(fb, service, mockRouter as any);
        component.ngOnInit();
    })

    it('deveria inicializar o componente com valores vazios', () => {
        expect(component.formulario.value).toEqual({
            titulo: '',
            autoria: '',
            imagem: '',
            genero: '',
            dataLeitura: '',
            classificacao: null
        })
    });

    it('deveria adicionar um novo livro', () => {
        const novoLivro = {
            titulo: 'Novo Livro',
            autoria: 'Autoria Desconhecida',
            imagem: 'http://example.com/cover.jpg',
            genero: 'romance',
            dataLeitura: '23/11/2025',
            classificacao: 5
        }

        const adicionarLivroSpy = jest.spyOn(service, 'adicionarLivro');
        const routerSpy = jest.spyOn(component['router'], 'navigate');
        component.formulario.setValue(novoLivro);
        component.adicionarLivro();

        expect(adicionarLivroSpy).toHaveBeenCalledWith({
            ...novoLivro,
            genero: component.generos.find(g => g.id === novoLivro.genero)
        });

        expect(component.formulario.value).toEqual({
             titulo: null,
            autoria: null,
            imagem: null,
            genero: null,
            dataLeitura: null,
            classificacao: null
        });

        expect(routerSpy).toHaveBeenCalledWith(['lista-livros']);
    })
});