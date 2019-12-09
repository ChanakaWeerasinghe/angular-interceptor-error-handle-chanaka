import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpBackend } from '@angular/common/http';
import { SpinnerService } from './spinner/spinner.service';
import 'rxjs/add/operator/do';

@Injectable()
export class I1 implements HttpInterceptor {

  constructor(public spinnerService: SpinnerService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.spinnerService.show();

    return next.handle(req).do(
      (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.spinnerService.hide();
        }
      },
      (err: any) => {
        if (req.headers.get('handleError') === 'onService') {
          console.log('Interceptor does nothing...');
        } else {
          console.log('onInterceptor handle ', err);
        }

      }
    );
  }
}
