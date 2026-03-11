import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import { CreateProductComponent } from './create-product.component';
import { CreateProductApiService } from './services/create-product-api.service';
import { CreateProductService } from './services/create-product.service';
import { Product } from '../../../types/product.inteface';
import { BASE64_IMAGE } from '../../../shared/mock/base64-image.mock';

const productMock: Product = {
  id: 1,
  title: 'Produto',
  description: 'Descricao',
  category: 'Categoria',
  price: 10,
  image: BASE64_IMAGE
}

const dialogRefMock = {
  close: jasmine.createSpy('close')
}

class MockCreateProductApiService {
  getAllCategories(): Observable<string[]> {
    return of(['electronics', `men's clothing`, 'jewelery']);
  }
}

describe('CreateProductComponent', () => {
  let component: CreateProductComponent;
  let fixture: ComponentFixture<CreateProductComponent>;
  let createProductService: CreateProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatSelectModule,
        MatIconModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        CreateProductComponent
      ],
      providers: [
        CreateProductService,
        CreateProductApiService,
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: productMock }
      ]
    })
      .compileComponents();

    TestBed.overrideComponent(CreateProductComponent, {
      set: {
        providers: [
          { provide: CreateProductApiService, useClass: MockCreateProductApiService }
        ]
      }
    });

    createProductService = TestBed.inject(CreateProductService);
    fixture = TestBed.createComponent(CreateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('dever listar as categorias', () => {
    const categories = ['electronics', `men's clothing`, 'jewelery'];
    component.categories$.subscribe((result) => {
      expect(categories).toEqual(result);
    })
  });

  it('deve verificar se o formulário está preenchido com as informações do produto', () => {
    expect(component.formGroup.get('id')?.value).toEqual(productMock.id);
    expect(component.formGroup.get('title')?.value).toEqual(productMock.title);
    expect(component.formGroup.get('description')?.value).toEqual(productMock.description);
    expect(component.formGroup.get('category')?.value).toEqual(productMock.category);
    expect(component.formGroup.get('price')?.value).toEqual(productMock.price);
  });

  it('deve chamar o metodo close ao clicar no botão cancelar', () => {
    component.onCancelClick();
    expect(dialogRefMock.close).toHaveBeenCalled();
  });

  fit('deve chamar o método save do createProductService ao enviar o formulário', () => {
    spyOn(createProductService, 'save').and.returnValue(Promise.resolve());

    const evento = {
      target: {
        files: [new File([''], 'imagem.jpeg', { type: 'image/jpeg' })]
      }
    }

    component.onImageSelected(evento);

    component.onSubmitForm();

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(createProductService.save).toHaveBeenCalled();
    })
  })
});
