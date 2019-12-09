import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { I1 } from './interceptors';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './spinner/spinner.service';

@NgModule({
  imports: [BrowserModule, HttpClientModule],
  declarations: [AppComponent, SpinnerComponent],
  providers: [
    SpinnerService,   
    {
      provide: HTTP_INTERCEPTORS,
      useClass: I1,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
