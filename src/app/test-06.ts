/**
 * Fix the following component so that it meets the requirements:
 * * The [textarea] becomes a user inputed property.
 * * The content that user inputs will preserve its whitespaces and linebreaks when printed under the [review_content] property
 * * It should not allow rendering of html tags to prevent a security vulnerability (keep the inner text however)
 * * If the user enters a link in the content (ex : https://wallethub.com) it should become an anchor element when printed in the page 
 */
import { Component, NgModule, SecurityContext } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ng-app',
  template: `
    <h2>User Review:</h2>
    <textarea class="textfield" placeholder="Write your Review" [(ngModel)]="review_input"></textarea>
    <br /><br />
    <h3>Output:</h3>
    <div class="output" [innerHTML]="formatReviewContent()"></div>
  `,
  styles: [
    `.textfield {
      width: 600px;
      height: 220px;
      padding: 10px;
      box-sizing: border-box;
    }`,
    `.output {
      max-width: 100%;
      width: 600px;
      border: solid 1px #f9f6f6;
      padding: 5px;
      background: #ecebeb;
      white-space: pre-wrap;
    }`,
  ],
})
export class ReviewComponent {
  // sample input
  review_input = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Maecenas tincidunt vestibulum ligula, sed viverra erat tempus nec.

Pellentesque blandit mauris congue elit eleifend, facilisis tristique dolor dictum:
          1) Nulla et tempus orci
          2) Integer semper porttitor faucibus
          
At https://wallethub.com <b>bolded text</b>`;

  constructor(private sanitizer: DomSanitizer) {}

  urlRegex = /((https?:\/\/|(www\.))[-a-zA-Z0-9@:%._\+~#=()]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*))/g;

  formatReviewContent() {
    const formattedHtml = this.review_input
        .replace(/</g, '&lt;') // excaping < and > to prevent html rendering
        .replace(/>/g, '&gt;')
        .replace(this.urlRegex, (url) => `<a href="${url}" target="_blank" rel="noopener">${url}</a>`);
  
    // Use DomSanitizer to sanitize the HTML content
    return this.sanitizer.sanitize(SecurityContext.HTML , formattedHtml);
  }
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ReviewComponent,
      },
    ]),
  ],
  declarations: [ReviewComponent],
})
export class ReviewModule {}
