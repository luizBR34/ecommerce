import { Injectable, Inject } from '@angular/core';
import { WINDOW } from 'src/assets/window.providers';

@Injectable({
  providedIn: 'root',
})
export class HostNameService {
  constructor(@Inject(WINDOW) private window: Window) {}

  getProductsLambdaHost(): string {
    const url = this.window.location.origin + `/products`;
    return url;
  }
}
