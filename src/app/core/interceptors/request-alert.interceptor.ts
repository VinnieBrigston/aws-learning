import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from './alert.service';

@Injectable()
export class RequestAlertInterceptor implements HttpInterceptor {
  constructor(private alertService: AlertService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.alertService.showAlert(
            'Unauthorized',
            'You are not authorized to access this resource.',
          );
        } else if (error.status === 403) {
          this.alertService.showAlert(
            'Forbidden',
            'Access to this resource is forbidden.',
          );
        }
        return throwError(() => new Error(error.message));
      }),
    );
  }
}
