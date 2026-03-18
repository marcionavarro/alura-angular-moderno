import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { Product } from '../../../types/product.inteface';
import { By } from '@angular/platform-browser';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve renderizar o produto no template', () => {
    const product: Product = {
      id: 1,
      title: 'IPhone 15',
      price: 1000,
      category: 'eletronico',
      description: 'Smarth Phone',
      image: 'src/assets/image.png'
    }

    component.product = product;
    fixture.detectChanges();

    const productImg = fixture.debugElement.query(By.css('img')).nativeElement;
    const productTitle = fixture.debugElement.query(By.css('h2')).nativeElement;
    const productDescription= fixture.debugElement.query(By.css('p')).nativeElement;
    const productPrice = fixture.debugElement.query(By.css('h3')).nativeElement;

    expect(productImg.src).toContain(product.image);
    expect(productTitle.textContent).toContain(product.title);
    expect(productDescription.textContent).toContain(product.description);
    expect(productPrice.textContent).toContain(`R$ ${product.price}`);
  });

  it('deve emitir o evento onDelete quando clicar no delete', () => {
    const product: Product = {
      id: 2,
      title: 'Samsung s22',
      price: 950,
      category: 'eletronico',
      description: 'Smarth Phone',
      image: 'src/assets/image.png'
    }

    component.product = product;
    fixture.detectChanges();

    const spy = jest.spyOn(component.onDelete, 'emit');
    
    component.isManagable = true;

    fixture.detectChanges();

    const managableElement = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(managableElement).not.toBeNull();

    component.onDeleteClick();
    expect(spy).toHaveBeenCalledWith(product);

  });

  it('deve emitir o evento onEdit quando clicar no edit', () => {
    const product: Product = {
      id: 2,
      title: 'Samsung s22',
      price: 950,
      category: 'eletronico',
      description: 'Smarth Phone',
      image: 'src/assets/image.png'
    }

    component.product = product;
    fixture.detectChanges();

    const spy = jest.spyOn(component.onEdit, 'emit');
    
    component.isManagable = true;

    fixture.detectChanges();

    const managableElement = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(managableElement).not.toBeNull();

    component.onEditClick();
    expect(spy).toHaveBeenCalledWith(product);

  });
});
