import { Component, inject, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';

import { CloudinaryService } from '../../services/cloudinary.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('reviewsContainer') reviewsContainer!: ElementRef;


  private cloudinaryService = inject(CloudinaryService);
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
  // Replace 'your-video-public-id' with your actual Cloudinary video public ID
  workVideos = [
    {
      publicId: 'your-video-public-id',  // Replace with your actual Cloudinary video public ID
      url: this.cloudinaryService.getVideoUrl('v1765622610/video-auto-care.mp4'),
      thumbnail: this.cloudinaryService.getOptimizedUrl('v1765622610/video-auto-care.mp4', 1280), // Video thumbnail
      title: 'Our Professional Flatbed Towing Service',
      description: 'Watch our team in action providing safe and reliable towing services'
    }
  ];

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
    },
    {
      id: 4,
      name: 'David Brown',
      text: 'I was locked out of my car and they came to the rescue. The technician was polite and opened the door without any damage.',
      date: 'Dec 05, 2023'
    },
    {
      id: 5,
      name: 'Jessica Wilson',
      text: 'Professional team. I used their long-distance towing service and my car arrived safely. Communication was excellent throughout.',
      date: 'Dec 12, 2023'
    },
    {
      id: 6,
      name: 'Robert Miller',
      text: 'Best towing company in town. Reliable and fair pricing. I keep their number saved just in case.',
      date: 'Jan 08, 2024'
    }
  ];

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

