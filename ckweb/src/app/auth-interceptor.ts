import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { UserService } from './user-service.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth.service';

/**
 * Add authorization header to every request.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        if (this.auth.authObj.value) {
            const accessToken = this.auth.authObj.value.id_token;
            const tokenType = this.auth.authObj.value.token_type;

            const authReq = req.clone({
                headers: req.headers.set('Authorization', `${tokenType} ${accessToken}`)
            });
            return next.handle(authReq);
        } else {
            return next.handle(req);
        }

    }
}

/** Http interceptor providers in outside-in order */
export const authInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
