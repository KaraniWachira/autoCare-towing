import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface GalleryImage {
    id: number;
    url: string;
    caption: string;
}

@Component({
    selector: 'app-gallery',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './gallery.component.html',
    styleUrl: './gallery.component.css'
})
export class GalleryComponent {
    // ADMIN: Add your tow truck and flatbed images here
    // Replace the placeholder URLs with your actual image URLs
    images: GalleryImage[] = [
        {
            id: 1,
            url: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=800',
            caption: 'Flatbed Tow Truck in Action'
        },
        {
            id: 2,
            url: 'https://images.unsplash.com/photo-1615900119312-2acd3a71f3aa?w=800',
            caption: 'Heavy Duty Towing Service'
        },
        {
            id: 3,
            url: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800',
            caption: 'Emergency Roadside Assistance'
        },
        {
            id: 4,
            url: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=800',
            caption: 'Professional Towing Equipment'
        },
        {
            id: 5,
            url: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=800',
            caption: 'Flatbed Transport Service'
        },
        {
            id: 6,
            url: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800',
            caption: 'Our Fleet Ready to Serve'
        }
    ];

    selectedImage: GalleryImage | null = null;

    openLightbox(image: GalleryImage): void {
        this.selectedImage = image;
    }

    closeLightbox(): void {
        this.selectedImage = null;
    }
}
