import { Component, inject, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { CloudinaryService } from '../../services/cloudinary.service';

import { TestimonialsService } from '../../services/testimonials.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('reviewsContainer') reviewsContainer!: ElementRef;


  private cloudinaryService = inject(CloudinaryService);
  private testimonialsService = inject(TestimonialsService);
  private sliderInterval: any;

  // Hero slider images - Public IDs extracted from Cloudinary
  // Format: just the file name without the full URL
  heroImagePublicIds = [
    'Multi-Vehicle_Carrier',  // First hero image
    'Heavy_Duty_Machinery_Towing',  // Second hero image
    'Classic_Car_Transport'   // Third hero image
  ];

  // Generate optimized Cloudinary URLs for hero images
  heroImages = this.heroImagePublicIds.map(publicId =>
    this.cloudinaryService.getOptimizedUrl(publicId, 1920)
  );

  // Request Service section background image from Cloudinary
  // Replace 'your-image-name' with the actual public ID of your desired background image
  requestServiceBgImage = this.cloudinaryService.getOptimizedUrl('Salvage_Vehicle_Towing', 1920);

  currentHeroIndex = 0;

  // Work video from Cloudinary
  workVideos = [
    {
      publicId: 'your-video-public-id',  // Replace with your actual Cloudinary video public ID
      url: this.cloudinaryService.getVideoUrl('v1765622610/video-auto-care.mp4'),
      thumbnail: this.cloudinaryService.getOptimizedUrl('v1765622610/video-auto-care.mp4', 1280), // Video thumbnail
      title: 'Our Professional Flatbed Towing Service',
      description: 'Watch our team in action providing safe and reliable towing services'
    }
  ];

  reviews = this.testimonialsService.reviews;

  ngOnInit() {
    // Start the automatic slider
    this.sliderInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change image every 5 seconds
  }

  ngOnDestroy() {
    // Clean up the interval when component is destroyed
    if (this.sliderInterval) {
      clearInterval(this.sliderInterval);
    }
  }

  nextSlide() {
    this.currentHeroIndex = (this.currentHeroIndex + 1) % this.heroImages.length;
  }

  previousSlide() {
    this.currentHeroIndex = (this.currentHeroIndex - 1 + this.heroImages.length) % this.heroImages.length;
  }

  goToSlide(index: number) {
    this.currentHeroIndex = index;
  }

  getCurrentHeroImage(): string {
    return this.heroImages[this.currentHeroIndex];
  }



  scrollReviews(direction: 'left' | 'right') {
    const container = this.reviewsContainer.nativeElement;
    const scrollAmount = 432; // 400px card width + 32px gap

    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }
}

