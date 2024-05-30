import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private modelCtrl: ModalController
  ) {}

  ngOnInit() {}

  onLogin() {
    this.authService.login();
    this.modelCtrl.dismiss({ message: 'This is a dummy message!' }, 'confirm');
    //this.router.navigateByUrl('/home');
  }

  onCancel() {
    this.modelCtrl.dismiss(1, 'cancel');
  }
}
