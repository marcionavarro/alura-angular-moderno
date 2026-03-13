import { TestBed } from '@angular/core/testing';

import { ProductsApiService } from './products-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Product } from '../../../types/product.inteface';
import { environment } from '../../../../environments/environment';

describe('ProductsApiService', () => {
  let httpTestingController: HttpTestingController;
  let productsApiService: ProductsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductsApiService
      ]
    });
    productsApiService = TestBed.inject(ProductsApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(productsApiService).toBeTruthy();
  });

  it('deve retornar um Observable<Product[]> ao chamar getAllProducts', () => {
    const itemPerPage = 5;
    const mockProducts: Product[] = [
      { id: 1, title: 'Produto A', category: 'eletronic', description: 'Product A', price: 50, image: 'image.png' },
      { id: 2, title: 'Produto B', category: `woman's clothes`, description: 'Product B', price: 80, image: 'image.png' }
    ]

    productsApiService.getAllProducts(itemPerPage).subscribe((products: Product[]) => {
      expect(products).toEqual(mockProducts);
    });
  });

  it('deve lidar com erro ao chamar getAllProducts', () => {
    const itemPerPage = 5;
    const errorMessage = 'Erro ao carregar produtos';

    productsApiService.getAllProducts(itemPerPage).subscribe(
      () => fail('esperava-se um erro, mas obteve sucesso'),
      (error: any) => {
        expect(error).toBeTruthy();
        expect(error.error).toEqual(errorMessage)
      }
    );

    const req = httpTestingController.expectOne(`${environment.apiUrl}/products?limit=${itemPerPage}`);
    expect(req.request.method).toEqual('GET');
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });
});
