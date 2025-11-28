import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CloudinaryService, CloudinaryImage } from '../../services/cloudinary.service';

@Component({
    selector: 'app-image-upload',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './image-upload.component.html',
    styleUrl: './image-upload.component.css'
})
export class ImageUploadComponent {
    @Output() imageUploaded = new EventEmitter<CloudinaryImage>();

    isUploading = false;
    uploadError: string | null = null;
    uploadSuccess: string | null = null;
    selectedCategory = 'others';  // Default category

    categories = [
        { id: 'saloon-cars', name: 'Saloon Cars' },
        { id: 'suvs', name: 'SUVs' },
        { id: 'heavy-machinery', name: 'Heavy Machinery' },
        { id: 'others', name: 'Others' }
    ];

    constructor(private cloudinaryService: CloudinaryService) { }

    /**
     * Opens the Cloudinary upload widget
     */
    async openUploadWidget(): Promise<void> {
        this.isUploading = true;
        this.uploadError = null;
        this.uploadSuccess = null;

        try {
            // Pass selected category to Cloudinary service
            const uploadedImage = await this.cloudinaryService.openUploadWidget(this.selectedCategory);

            // Show success message
            this.uploadSuccess = `Image uploaded successfully to ${this.categories.find(c => c.id === this.selectedCategory)?.name}!`;

            // Emit the uploaded image to parent component
            this.imageUploaded.emit(uploadedImage);

            // Clear success message after 3 seconds
            setTimeout(() => {
                this.uploadSuccess = null;
            }, 3000);

        } catch (error: any) {
            console.error('Upload error:', error);
            this.uploadError = error.message || 'Failed to upload image. Please try again.';

            // Clear error message after 5 seconds
            setTimeout(() => {
                this.uploadError = null;
            }, 5000);
        } finally {
            this.isUploading = false;
        }
    }
}
