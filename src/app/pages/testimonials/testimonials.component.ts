import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export class TestimonialsComponent {
  reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      text: 'Absolutely a lifesaver! My car broke down in the middle of nowhere at 2 AM. The driver arrived within 30 minutes and was incredibly professional.',
      date: 'Oct 15, 2023'
    },
    {
      id: 2,
      name: 'Mike Williams',
      text: 'Great service for heavy duty towing. They handled our construction equipment with care and expertise. Highly recommended!',
      date: 'Nov 02, 2023'
    },
    {
      id: 3,
      name: 'Emily Davis',
      text: 'Fast, friendly, and affordable. The flat tire service was quick and got me back on the road in no time.',
      date: 'Nov 20, 2023'
    }

  ];
}
