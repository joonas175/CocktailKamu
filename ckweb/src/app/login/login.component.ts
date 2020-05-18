import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BASE_API_URL } from '../global-variables';
import { UserService } from '../user-service.service';
import { AuthService, AuthObj } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
      });
    });
  }

}
