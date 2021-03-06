import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BASE_API_URL } from '../global-variables';
import { UserService } from '../user-service.service';
import { AuthService, AuthObj } from '../auth.service';

/**
 * Component to handle login when redirecting back from Google.
 * Sends OAuth code to backend, which exchanges it to tokens and
 * returns to this client. Auth object is saved to web storage.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  error = false;

  constructor(private route: ActivatedRoute, private http: HttpClient, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const code = params.get('code');
      const url = params.get('state');
      console.log(code);
      this.http.get<AuthObj>(`${BASE_API_URL}/token`, { params: new HttpParams().set('code', `${code}`) }).subscribe((value) => {
        console.log(value);
        this.auth.saveAuthObj(value);
        this.router.navigateByUrl(url);
      }, (error) => {
        console.log(error);
        this.error = true;
      });
    });
  }

}
