import { Component } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styles: [
    `
      .review {
        padding-bottom: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      h2 {
        margin: 2rem 0;
        font-size: 2rem;
        color: var(--primary);
      }

      h3 {
        font-size: 1.5rem;
        margin-bottom: 2rem;
      }

      a {
        color: var(--primary);
      }

      button {
        margin: 2rem 0;
      }
    `,
  ],
})
export class ReviewComponent {
  constructor() {}
}
