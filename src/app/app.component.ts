import { Component } from '@angular/core';

import '../assets/css/styles.css';

//  Imports all Services
import { WebSocketService }    from './services/websocket-service';
import { TryService }    from './services/try-service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private tryService  : TryService,
    private chatService : WebSocketService
  ) {}

  ngOnInit() {
    let payload = 'Payload';
    let uri = 'api:try';
    this.tryService.getData(uri, payload).subscribe((response) => {
      console.log('Response: ', response);
    });
  }
}