import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Global loading service for managing loading states across the app
 * Primarily used for route transitions
 */
@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    show(): void {
        this.loadingSubject.next(true);
    }

    hide(): void {
        this.loadingSubject.next(false);
    }
}
