import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Product } from '../models/product';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';
import { HostNameService } from '../services/host-name.service';

@Injectable({ providedIn: 'root' })
export class ContentService {
  constructor(
    private http: HttpClient,
    private httpServiceErrorHandler: ProcessHTTPMsgService,
    private hostNameService: HostNameService
  ) {}

  postLogaUsuario(
    username: string,
    password: string
  ): Observable<HttpResponse<any>> {
    const url = `https://localhost:8443/myapp/login`;

    const params = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http
      .post<any>(url, params, {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        }).append('Cache-Control', 'max-age=0'),
        observe: 'response' as 'body',
      })
      .pipe(
        map((user) => {
          return user;
        })
      );
  }

  getAllProducts(): Observable<Product[]> {
    const url = this.hostNameService.getProductsLambdaHost() + `/getproducts/`;
    return this.http
      .get<Product[]>(url, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        map((responseData) => {
          const productList: Product[] = [];
          for (const key in responseData) {
            productList.push(responseData[key]);
          }
          return productList;
        }),
        catchError(this.httpServiceErrorHandler.handleError)
      );
  }
}
