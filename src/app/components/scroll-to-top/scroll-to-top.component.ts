import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-scroll-to-top',
    standalone: true,
    imports: [CommonModule, MatIconModule],
    template: `
    <button
      (click)="scrollToTop()"
      [class.opacity-100]="isVisible"
      [class.opacity-0]="!isVisible"
      [class.pointer-events-none]="!isVisible"
      class="fixed bottom-8 right-8 z-50 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      aria-label="Scroll to top"
    >
      <mat-icon class="text-2xl">arrow_upward</mat-icon>
    </button>
  `,
    styles: [`
    :host {
      display: block;
    }
  `]
})
export class ScrollToTopComponent {
    isVisible = false;

    @HostListener('window:scroll')
    onWindowScroll() {
        this.isVisible = window.scrollY > 300;
    }

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
