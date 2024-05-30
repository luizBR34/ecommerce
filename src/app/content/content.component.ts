import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ContentService } from './content.component.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  products!: Product[];
  msgError = null;
  isFetching = false;
  isAlertOpen = false;
  alertButtons = ['Ok'];

  constructor(private contentService: ContentService) {}

  ngOnInit() {
    /*     this.products = [
      {
        productId: 26922,
        productName: 'Samsung Mobile phone',
        productDescription: 'Samsung',
        productPrice: 3000.4,
        productStock: 5,
        productImageUrl: 'https://imgs.casasbahia.com.br/1547494977/1xg.jpg',
      },
      {
        productId: 26980,
        productName: 'Drone Mavic 3',
        productDescription: 'Drone DJI',
        productPrice: 800,
        productStock: 13,
        productImageUrl:
          'https://cdn.awsli.com.br/600x1000/514/514723/produto/214436821/foto-mavic-3-pro-02-qgz51tnax6.png',
      },

      {
        productId: 456766,
        productName: 'Playstation 5',
        productDescription: 'Video Game',
        productPrice: 1200,
        productStock: 15,
        productImageUrl:
          'https://cdn.dooca.store/39545/products/7382b8f43b7acd19c168f058faebc7c0_620x620+fill_ffffff.jpg?v=1661976875&webp=0',
      },
    ]; */

    this.isFetching = true;
    this.contentService.getAllProducts().subscribe(
      (productsReceived) => {
        this.isFetching = false;
        this.msgError = null;
        this.products = productsReceived;
      },
      (errorResponse) => {
        this.isFetching = false;
        this.msgError = errorResponse;
        this.isAlertOpen = true;
      }
    );
  }

  onHandleError(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
}
