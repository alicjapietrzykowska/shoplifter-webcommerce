import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page403',
  template: `
    <div class="container">
      <div class="page-wrapper">
        <h2 class="no-border text-center m-0">
          {{ 'general.500pageMessage' | translate }}
        </h2>
        <div>{{ 'general.500pageText' | translate }}</div>
        <button mat-flat-button color="primary" routerLink="/">
          {{ 'common.backToMain' | translate }}
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .page-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: calc(100vh - 20vh);
      }
      h2 {
        font-size: 2rem;
        color: var(--primary);
      }
      div {
        margin-bottom: 2rem;
      }
    `,
  ],
})
export class Page500Component implements OnInit {
  constructor() {}

  ngOnInit() {}
}
