import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-loading-spinner',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './loading-spinner.component.html',
    styleUrl: './loading-spinner.component.css'
})
export class LoadingSpinnerComponent {
    @Input() message: string = 'Loading...';
    @Input() size: 'sm' | 'md' | 'lg' = 'md';

    get spinnerSizeClass(): string {
        switch (this.size) {
            case 'sm':
                return 'h-8 w-8';
            case 'lg':
                return 'h-24 w-24';
            case 'md':
            default:
                return 'h-16 w-16';
        }
    }
}
