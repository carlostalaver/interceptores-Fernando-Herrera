import { Injectable, Injector, OnInit, Inject, forwardRef } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UsuariosService } from '../services/usuarios.service';
import { Router } from '@angular/router';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  private router: Router;

  constructor(public injector: Injector) {

    console.log('%cepaaaaaaaaaaaaa', 'background-color: aqua;', this.injector);
    /*     if (this.router === undefined) {
          this.router = this.injector.get(Router);
        } */
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token: string = localStorage.getItem('token') || 'mitokendeusuariopersonalizado';
    let requestClone = req;

    const headers = new HttpHeaders({
      'token-usuario': token
    });

    // El req SE DEBE clonar porq no se puede manipular el req directamente
    if (token) {
      requestClone = req.clone({
        headers
      });
    }

    return next.handle(requestClone)
      .pipe(
        catchError(this.manejarError)
      );

  }

  manejarError(err: HttpErrorResponse) {
    console.log('%clabel', 'background-color: orange;', this.router);
    if (err.status === 401) {
      // this.router.navigate(['/login']);
    }
    return throwError(err);
  }

}
