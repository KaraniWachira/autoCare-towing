import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RequestServiceComponent } from './pages/request-service/request-service.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { TestimonialsComponent } from './pages/testimonials/testimonials.component';
import { GalleryComponent } from './pages/gallery/gallery.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'services', component: RequestServiceComponent },
    { path: 'about', component: AboutUsComponent },
    { path: 'request-service', component: RequestServiceComponent },
    { path: 'contact', component: ContactUsComponent },
    { path: 'testimonials', component: TestimonialsComponent },
    { path: 'gallery', component: GalleryComponent },
    { path: '**', redirectTo: '' }
];
