import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterOutlet, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { LayoutComponent } from './components/layout/layout.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { LoadingService } from './services/loading.service';
import { fadeAnimation } from './animations/route-animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, LayoutComponent, LoadingSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [fadeAnimation]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'autocare-towing';
  private routerSubscription?: Subscription;

  constructor(
    private router: Router,
    public loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    // Listen to router events to show/hide loading spinner
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loadingService.show();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loadingService.hide();
      }
    });
  }

  ngOnDestroy(): void {
    // Clean up subscription to prevent memory leaks
    this.routerSubscription?.unsubscribe();
  }
}
