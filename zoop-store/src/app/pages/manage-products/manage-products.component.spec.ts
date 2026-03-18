import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageProductsComponent } from './manage-products.component';
import { MatDialog } from '@angular/material/dialog';

import { of } from 'rxjs';
import { BannerComponent } from '../../shared/components/banner/banner.component';
import { SearchComponent } from '../../shared/components/search/search.component';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductsService } from '../../shared/services/products/products.service';
import { ProductsApiService } from '../../shared/services/products/products-api.service';
import { StorageService } from '../../shared/services/storage/storage.service';

const productsMock = [
  { id: 1, title: 'Produto A', category: 'eletronic', description: 'Product A', price: 50, image: 'image.png' },
  { id: 2, title: 'Produto B', category: `woman's clothes`, description: 'Product B', price: 80, image: 'image.png' }
];

const data = productsMock;

const storageServiceMock = {
  getAll: () => Object.values(data),
  setValue: (key: any, value: any) => {
    data[key] = value;
  },
  remove: (key: any) => {
    delete data[key];
  }
};

describe('ManageProductsComponent', () => {
  let component: ManageProductsComponent;
  let fixture: ComponentFixture<ManageProductsComponent>;
  let productsService: ProductsService;

  const dialogRefSpy = {
    afterClosed: jest.fn().mockReturnValue(of({}))
  };

  const matDialogMock = {
    open: jest.fn().mockReturnValue(dialogRefSpy)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BannerComponent,
        SearchComponent,
        MatIconModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
      ],
      declarations: [ManageProductsComponent],
      providers: [
        { provide: MatDialog, useValue: matDialogMock },
        ProductsService,
        ProductsApiService,
        { provide: StorageService, useValue: storageServiceMock }
      ]
    }).compileComponents();

    productsService = TestBed.inject(ProductsService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve abrir o diálogo de criação de produto', () => {
    component.onSubscribeProduct();

    expect(matDialogMock.open).toHaveBeenCalled();
  });

  it('deve deletar o produto ao chamar onDelete', () => {
    jest.spyOn(window, 'confirm').mockReturnValue(true);

    const mockProduct = productsMock[0];

    component.onDelete(mockProduct);

    expect(component.products()).not.toBeNull();
  });

  it('deve atualizar a lista de produtos ao chamar onSearchText', () => {
    component.onSearchText('A');

    expect(component.products()[0].title).toEqual('Produto A');
  });

  it('deve manter a lista de produtos quando busca vazia', () => {
    component.onSearchText('');

    expect(component.products().length).toBeGreaterThanOrEqual(1);
  });

  it('deve abrir o diálogo de edição', () => {
    const mockProduct = productsMock[0];

    component.onEdit(mockProduct);

    expect(matDialogMock.open).toHaveBeenCalled();
  });
});