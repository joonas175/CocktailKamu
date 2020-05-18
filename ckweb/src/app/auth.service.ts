
import { Injectable, Inject } from '@angular/core';
import { Ingredient } from './entities/Ingredient';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BASE_API_URL } from './global-variables';
import { Drink } from './entities/Drink';
import { Subject, BehaviorSubject } from 'rxjs';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authObj: BehaviorSubject<AuthObj> = new BehaviorSubject<AuthObj>(null);

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.getAuthObj();
  }

  getAuthObj(): void {
    const authObj = this.storage.get('authObj');
    if (authObj) {
      // Check token expiration
      console.log(authObj);
      this.authObj.next(authObj);
    }
  }

  saveAuthObj(authObj: AuthObj): void {
    this.storage.set('authObj', authObj);
    this.authObj.next(authObj);
  }

}


export interface AuthObj {
  access_token: string;
  refresh_token: string;
  id_token: string;
  token_type: string;
}

