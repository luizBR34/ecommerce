import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { ContentService } from '../content/content.component.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private alertCtrl: AlertController,
    private backService: ContentService,
    private router: Router
  ) {}

  ngOnInit() {}

  onLogin() {
    this.alertCtrl
      .create({
        header: 'Please enter your credentials.',
        inputs: [
          {
            name: 'email',
            type: 'text',
            placeholder: 'E-Mail',
            attributes: {
              maxlength: 20,
            },
          },
          {
            name: 'password',
            type: 'text',
            placeholder: 'Password',
            attributes: {
              maxlength: 30,
            },
          },
        ],
        buttons: [
          { text: 'Cancel', role: 'cancel' },
          {
            text: 'Sign In',
            handler: (alertData) => {
              this.backService
                .postLogaUsuario(alertData.email, alertData.password)
                .subscribe(
                  (data: HttpResponse<any>) => {
                    console.log('Logged Successfully!');
                    this.router.navigate(['/eventos']);
                  },
                  (errorResponse) => {
                    if (errorResponse.status == 404) {
                      console.log('User not found!');
                    } else {
                      console.log('Error while logging!');
                      this.router.navigate([
                        '/externalRedirect',
                        {
                          externalUrl:
                            'http://localhost:8443' +
                            '/oauth2/authorization/eventoas',
                        },
                      ]);
                    }
                  }
                );
            },
          },
        ],
      })
      .then((alertEl) => alertEl.present());
  }
}
