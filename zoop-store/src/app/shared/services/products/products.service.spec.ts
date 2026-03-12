import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductsApiService } from './products-api.service';
import { ProductsService } from './products.service';
import { Observable, of } from 'rxjs';
import { Product } from '../../../types/product.inteface';
import { StorageService } from '../storage/storage.service';

class ProductsApiServiceMock {
  getAllProducts(): Observable<Product[]> {
    return of([
      { id: 1, title: 'Produto A', category: 'eletronic', description: 'Product A', price: 109, image: 'image.png' },
      { id: 2, title: 'Produto B', category: `woman's clothes`, description: 'Product A', price: 10.5, image: 'image.png' },
    ])
  }
}

class StorageServiceMock {
  private data: { [key: string]: any } = {};

  getAll(): any[] {
    return Object.values(this.data)
  }

  setValue(key: string, value: any) {
    this.data[key] = value;
  }

  remove(key: string): void {
    delete this.data[key];
  }
}

const productsStorage: Product[] = [
  { id: 3, title: 'Produto C', category: 'eletronic', description: 'Produto C', price: 109, image: 'image.png' },
  { id: 4, title: 'Produto D', category: `woman's clothes`, description: 'Product D', price: 10.5, image: 'image.png' },
]

describe('ProductsService', () => {
  let service: ProductsService;
  let sessionStorage = new StorageServiceMock();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ProductsService,
        { provide: ProductsApiService, useClass: ProductsApiServiceMock },
        { provide: StorageService, useClass: StorageServiceMock },
      ]
    });

    sessionStorage.setValue('products', productsStorage);
    TestBed.overrideProvider(StorageService, { useValue: sessionStorage });

    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve inicializar os produtos com os dados do storage', () => {
    const products = service.products().flat();
    expect(products[0]).toEqual(productsStorage[0]);
    expect(products[1]).toEqual(productsStorage[1])
  });

  it('deve filtrar os produtos pelo título', () => {
    service.products.set(productsStorage);

    service.find('C');

    const products = service.products();

    expect(products.length).toBe(1);
    expect(products[0].title).toBe('Produto C');
  });

  it('deve retornar todos os produtos', () => {
    const produtos: Product[] = [
      { id: 5, title: 'Produto F', category: 'eletronic', description: 'Produto F', price: 109, image: 'image.png' },
    ]
    // service.products.set(productsStorage);

    sessionStorage.setValue('products', produtos);
    const productCreate = service.fetchAllProductsCreated()().flat();

    expect(productCreate).toEqual(produtos);
  });

  it('deve buscar os produtos da API e os  que estão no Session Storage', () => {
    service.fetchAllProducts(10);
    expect(service.products().length).toBe(3);
  });

  it('deve remover o produto armazenado', () => {
    spyOn(sessionStorage, 'remove');
    const initialProductLength = sessionStorage.getAll().length;

    service.delete(productsStorage[0]);

    expect(sessionStorage.remove).toHaveBeenCalledTimes(1);
    expect(sessionStorage.getAll().length).toBeLessThanOrEqual(initialProductLength);
  })
});
