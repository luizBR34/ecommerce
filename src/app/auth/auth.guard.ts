import { Injectable } from '@angular/core';
import {
  CanLoad,
  GuardResult,
  MaybeAsync,
  Route,
  Router,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ModalController } from '@ionic/angular';
import { AuthComponent } from './auth.component';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  user?: Users;

  constructor(
    private authService: AuthService,
    private router: Router,
    private modalCtrl: ModalController
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (!this.authService.userIsAuthenticated) {
      this.modalCtrl
        .create({
          component: AuthComponent,
          componentProps: {
            selectedUser: this.user,
            id: 1,
          },
        })
        .then((modelEl) => {
          modelEl.present();
          return modelEl.onDidDismiss();
        })
        .then((resultData) => {
          console.log(resultData.data, resultData.role);
          if (resultData.role === 'confirm') {
            console.log('YOU ARE LOGGED!');
          }
        });
    }
    return this.authService.userIsAuthenticated;
  }
}
