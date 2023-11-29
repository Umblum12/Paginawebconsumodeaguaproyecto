import { Component } from '@angular/core';
import Hotjar from '@hotjar/browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Paginawebconsumodeaguaproyecto';
}

const siteId = 3735888;
const hotjarVersion = 6;

Hotjar.init(siteId, hotjarVersion);