import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialsService } from '../../services/testimonials.service';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export class TestimonialsComponent {
  private testimonialsService = inject(TestimonialsService);
  reviews = this.testimonialsService.reviews;
}
