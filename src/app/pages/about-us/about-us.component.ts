import { Component, inject } from '@angular/core';
import { CloudinaryService } from '../../services/cloudinary.service';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {
  private cloudinaryService = inject(CloudinaryService);

  // Hero background image
  heroBackgroundImage = this.cloudinaryService.getOptimizedUrl('Heavy_Duty_Machinery_Towing', 1920);

  // Story section image
  storyImage = this.cloudinaryService.getOptimizedUrl('Multi-Vehicle_Carrier', 1000);

  // Fleet images
  fleetImages = {
    flatbed: this.cloudinaryService.getOptimizedUrl('Classic_Car_Transport', 800),
    wrecker: this.cloudinaryService.getOptimizedUrl('Salvage_Vehicle_Towing', 800),
    rotator: this.cloudinaryService.getOptimizedUrl('Heavy_Duty_Machinery_Towing', 800)
  };
}
