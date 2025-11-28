import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloudinaryService, CloudinaryImage } from '../../services/cloudinary.service';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';

interface GalleryImage {
    id: string;
    url: string;
    caption: string;
    publicId?: string;
}

@Component({
    selector: 'app-gallery',
    standalone: true,
    imports: [CommonModule, LoadingSpinnerComponent],
    templateUrl: './gallery.component.html',
    styleUrl: './gallery.component.css'
})
export class GalleryComponent implements OnInit {
    images: GalleryImage[] = [];
    selectedImage: GalleryImage | null = null;
    isLoading = false;
    error: string | null = null;

    // Category filtering
    categories = [
        { id: 'all', name: 'All Vehicles', icon: 'apps' },
        { id: 'saloon-cars', name: 'Saloon Cars', icon: 'directions_car' },
        { id: 'suvs', name: 'SUVs', icon: 'airport_shuttle' },
        { id: 'heavy-machinery', name: 'Heavy Machinery', icon: 'local_shipping' },
        { id: 'others', name: 'Others', icon: 'category' }
    ];
    selectedCategory = 'all';

    constructor(private cloudinaryService: CloudinaryService) { }

    ngOnInit(): void {
        this.loadImages(this.selectedCategory);
    }

    /**
     * Load images from Cloudinary
     * Falls back to localStorage for captions
     */
    async loadImages(category: string = 'all'): Promise<void> {
        this.isLoading = true;
        this.error = null;

        try {
            // Fetch images from Cloudinary by category
            const cloudinaryImages = await this.cloudinaryService.fetchImagesByCategory(category);

            // Load saved captions from localStorage
            const savedCaptions = this.loadCaptionsFromStorage();

            // Merge Cloudinary images with saved captions
            this.images = cloudinaryImages.map(img => ({
                id: img.id,
                url: img.url,
                caption: savedCaptions[img.publicId] || `AutoCare Towing - ${img.publicId}`,
                publicId: img.publicId
            }));

            // If no images found in Cloudinary, show empty state
            if (this.images.length === 0) {
                console.warn(`No images found for category "${category}". Make sure images are tagged correctly in Cloudinary.`);
            }
        } catch (err: any) {
            console.error('Failed to load images from Cloudinary:', err);
            this.error = 'Failed to load images. Please check your internet connection and try again.';

            // Fallback: try to load from localStorage
            const savedImages = localStorage.getItem('galleryImages');
            if (savedImages) {
                this.images = JSON.parse(savedImages);
            }
        } finally {
            this.isLoading = false;
        }
    }

    /**
     * Load captions from localStorage
     */
    private loadCaptionsFromStorage(): { [key: string]: string } {
        const savedCaptions = localStorage.getItem('imageCaptions');
        return savedCaptions ? JSON.parse(savedCaptions) : {};
    }

    /**
     * Open lightbox with the selected image
     */
    openLightbox(image: GalleryImage): void {
        // Use full-size URL if it's a Cloudinary image
        if (image.publicId) {
            this.selectedImage = {
                ...image,
                url: this.cloudinaryService.getFullSizeUrl(image.publicId)
            };
        } else {
            this.selectedImage = image;
        }
    }

    /**
     * Close the lightbox
     */
    closeLightbox(): void {
        this.selectedImage = null;
    }

    /**
     * Filter images by category
     */
    filterByCategory(category: string): void {
        this.selectedCategory = category;
        this.loadImages(category);
    }
}
