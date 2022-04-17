import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  entrada: string = '';
  consola: string = '';

  tabsim: boolean = true;
  taberr: boolean = true;

}
