import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  isSubmitting = false;

  async onSubmit(event: Event) {
    event.preventDefault();
    this.isSubmitting = true;

    // Simulate form submission delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    this.isSubmitting = false;
    alert('Message sent! We will get back to you soon.');
  }
}
