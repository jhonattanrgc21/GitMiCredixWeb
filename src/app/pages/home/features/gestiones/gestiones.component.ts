import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gestiones-page-component',
  template: `
    <div class="gestiones-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .gestiones-container {
      background-color: white;
      height: 100%;
      border-radius: 8px;
    }
  `]
})
export class GestionesMainPageComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }
}
