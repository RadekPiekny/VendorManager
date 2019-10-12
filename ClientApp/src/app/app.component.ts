import { Component } from '@angular/core';
import { GeneralService } from './service/general.service'

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';

  constructor( public generalService: GeneralService){}
}
