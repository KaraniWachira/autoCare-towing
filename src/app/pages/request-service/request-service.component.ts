import { Component, inject } from '@angular/core';
import { CloudinaryService } from '../../services/cloudinary.service';

@Component({
  selector: 'app-request-service',
  standalone: true,
  imports: [],
  templateUrl: './request-service.component.html',
  styleUrl: './request-service.component.css'
})
export class RequestServiceComponent {
  private cloudinaryService = inject(CloudinaryService);

  // Using local asset for the specialized transport image
  specializedTransportImage = 'assets/specialized-transport.jpg';

  heroBackgroundImage = this.cloudinaryService.getOptimizedUrl('v1765622597/Classic_Cars_Towing.jpg', 1920);
}
