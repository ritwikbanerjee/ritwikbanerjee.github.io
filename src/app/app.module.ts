import { NgModule }            from '@angular/core';
import { BrowserModule }       from '@angular/platform-browser';
import { AppComponent }        from './app.component';
// Import all services
import { WebSocketService }    from './services/websocket-service';
import { TryService }          from './services/try-service';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    TryService,
    WebSocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }