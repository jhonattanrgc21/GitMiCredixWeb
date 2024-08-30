import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'managements-page-component',
  template: `
    <div class="managements-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .managements-container {
      background-color: white;
      height: 100%;
      border-radius: 8px;
    }

    router-outlet + ::ng-deep * {
      display: block;
      height: 100%
    }

  `]
})
export class ManagementsMainPageComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }
}
