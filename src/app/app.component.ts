import {Component} from '@angular/core';

@Component({
  selector: 'uom-root',
  template: `
    <div class="container pt-5 text-center">
      <h1>Easy Unit Converter</h1>
      <p class="lead">by <a href="https://noticeeverything.com" rel="noopener" target="_blank">Notice Everything Creative</a></p>
      <router-outlet></router-outlet>
    </div>
    <uom-footer></uom-footer>
  `
})
export class AppComponent {

}
