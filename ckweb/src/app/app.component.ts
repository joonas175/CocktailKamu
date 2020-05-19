import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  title = 'ckweb';

  loggedIn = false;

  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthService, private http: HttpClient) {
    auth.authObj.subscribe((value) => {
      if (value !== null) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  }

  ngOnInit(): void {
    const authObj = this.auth.authObj.value;
    if (authObj !== null) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }

    /**
     * jQuery and angular together may be a bad idea but I don't care.
     * Atleast this fixes pills not stacking up.
     */
    // Stack menu when collapsed
    $('#navbarSupportedContent').on('show.bs.collapse', () => {
      $('.nav-pills').addClass('flex-column');
    });

    // Unstack menu when not collapsed
    $('#navbarSupportedContent').on('hide.bs.collapse', () =>  {
      $('.nav-pills').removeClass('flex-column');
    });
  }

  loginUrl(): string {
    return 'https://accounts.google.com/o/oauth2/v2/auth?' +
      'response_type=code&' +
      'client_id=841190437727-qrkbg7i12nqg7shdbk029a5qr4mt6tm9.apps.googleusercontent.com&' +
      'scope=openid%20email&' +
      `redirect_uri=${environment.redirect_url}&` +
      `state=${this.router.url.split('?')[0]}&` +
      'access_type=offline';
  }

  logout(event: MouseEvent): void {
    event.preventDefault();
    this.auth.saveAuthObj(null);
  }

}
