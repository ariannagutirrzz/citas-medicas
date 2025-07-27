import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token expired, try to refresh
          const refreshToken = localStorage.getItem('refreshToken');
          if (refreshToken) {
            return this.authService.refreshToken().pipe(
              switchMap((response: any) => {
                localStorage.setItem('token', response.token);
                localStorage.setItem('refreshToken', response.refreshToken);
                
                // Retry the original request with new token
                const newRequest = request.clone({
                  setHeaders: {
                    Authorization: `Bearer ${response.token}`
                  }
                });
                return next.handle(newRequest);
              }),
              catchError((refreshError) => {
                // Refresh failed, logout user
                this.authService.logout();
                this.router.navigate(['/login']);
                return throwError(refreshError);
              })
            );
          } else {
            // No refresh token, logout user
            this.authService.logout();
            this.router.navigate(['/login']);
          }
        }
        return throwError(error);
      })
    );
  }
} 