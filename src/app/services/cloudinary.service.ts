import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

// Declare cloudinary global variable from the widget script
declare const cloudinary: any;

export interface CloudinaryImage {
    id: string;
    url: string;
    caption: string;
    publicId: string;
    createdAt: string;
}

@Injectable({
    providedIn: 'root'
})
export class CloudinaryService {
    private widget: any;

    constructor() { }

    /**
     * Opens the Cloudinary upload widget
     * @param categoryTag Optional category tag to apply to uploaded image
     * @returns Promise that resolves with uploaded image data
     */
    openUploadWidget(categoryTag?: string): Promise<CloudinaryImage> {
        return new Promise((resolve, reject) => {
            // Check if cloudinary is available
            if (typeof cloudinary === 'undefined') {
                reject(new Error('Cloudinary widget not loaded. Please check your internet connection.'));
                return;
            }

            // Prepare tags: base tag + category tag
            const tags = [environment.cloudinary.baseTag];
            if (categoryTag) {
                tags.push(categoryTag);
            }

            // Create and configure the upload widget
            this.widget = cloudinary.createUploadWidget(
                {
                    cloudName: environment.cloudinary.cloudName,
                    uploadPreset: environment.cloudinary.uploadPreset,
                    folder: environment.cloudinary.folder,
                    tags: tags,  // Apply tags during upload
                    sources: ['local', 'url', 'camera'],
                    multiple: false,
                    maxFiles: 1,
                    clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
                    maxFileSize: 5000000, // 5MB
                    styles: {
                        palette: {
                            window: '#1F2937',
                            windowBorder: '#EF4444',
                            tabIcon: '#FFFFFF',
                            menuIcons: '#FFFFFF',
                            textDark: '#000000',
                            textLight: '#FFFFFF',
                            link: '#EF4444',
                            action: '#EF4444',
                            inactiveTabIcon: '#9CA3AF',
                            error: '#F87171',
                            inProgress: '#FBBF24',
                            complete: '#10B981',
                            sourceBg: '#111827'
                        },
                        fonts: {
                            default: null,
                            "'Roboto', sans-serif": {
                                url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap',
                                active: true
                            }
                        }
                    }
                },
                (error: any, result: any) => {
                    if (error) {
                        console.error('Upload widget error:', error);
                        reject(error);
                        return;
                    }

                    if (result.event === 'success') {
                        const imageData: CloudinaryImage = {
                            id: result.info.public_id,
                            url: result.info.secure_url,
                            caption: '', // Will be set by user after upload
                            publicId: result.info.public_id,
                            createdAt: new Date().toISOString()
                        };
                        resolve(imageData);
                        this.widget.close();
                    }
                }
            );

            // Open the widget
            this.widget.open();
        });
    }

    /**
     * Generates an optimized Cloudinary URL with transformations
     * @param publicId The public ID of the image
     * @param width Desired width
     * @param height Desired height
     * @returns Optimized image URL
     */
    getOptimizedUrl(publicId: string, width: number = 800, height?: number): string {
        const baseUrl = `https://res.cloudinary.com/${environment.cloudinary.cloudName}/image/upload`;
        const transformations = height
            ? `w_${width},h_${height},c_fill,q_auto,f_auto`
            : `w_${width},c_scale,q_auto,f_auto`;

        return `${baseUrl}/${transformations}/${publicId}`;
    }

    /**
     * Gets the thumbnail URL for an image
     * @param publicId The public ID of the image
     * @returns Thumbnail URL
     */
    getThumbnailUrl(publicId: string): string {
        return this.getOptimizedUrl(publicId, 400, 400);
    }

    /**
     * Gets the full-size URL for lightbox
     * @param publicId The public ID of the image
     * @returns Full-size image URL
     */
    getFullSizeUrl(publicId: string): string {
        return this.getOptimizedUrl(publicId, 1920);
    }

    /**
     * Fetch images from Cloudinary using tag-based listing
     * Requires enabling "Resource list" in Cloudinary Security Settings
     * @param tag The tag to filter images by (default from environment)
     * @returns Promise with array of CloudinaryImage objects
     */
    async fetchImagesFromCloudinary(tag?: string): Promise<CloudinaryImage[]> {
        const imageTag = tag || environment.cloudinary.baseTag || 'autocare-towing';
        const listUrl = `https://res.cloudinary.com/${environment.cloudinary.cloudName}/image/list/${imageTag}.json`;

        try {
            const response = await fetch(listUrl);

            if (!response.ok) {
                throw new Error(`Failed to fetch images: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();

            // Cloudinary returns { resources: [...] }
            const resources = data.resources || [];

            // Transform Cloudinary response to CloudinaryImage format
            return resources.map((resource: any) => ({
                id: resource.public_id,
                url: this.getOptimizedUrl(resource.public_id, 800),
                caption: '', // Captions will be added by admin or loaded from localStorage
                publicId: resource.public_id,
                createdAt: resource.created_at || new Date().toISOString()
            }));
        } catch (error) {
            console.error('Error fetching images from Cloudinary:', error);
            throw error;
        }
    }

    /**
     * Fetch images from Cloudinary filtered by category
     * @param category Category to filter by ('all', 'saloon-cars', 'suvs', 'heavy-machinery', 'others')
     * @returns Promise with array of CloudinaryImage objects
     */
    async fetchImagesByCategory(category: string): Promise<CloudinaryImage[]> {
        // If 'all', fetch using base tag to get all images
        if (category === 'all') {
            return this.fetchImagesFromCloudinary(environment.cloudinary.baseTag);
        }

        // Otherwise, fetch using the specific category tag
        const categoryTag = environment.cloudinary.categoryTags[category as keyof typeof environment.cloudinary.categoryTags];

        if (!categoryTag) {
            console.warn(`Unknown category: ${category}. Falling back to 'all'.`);
            return this.fetchImagesFromCloudinary(environment.cloudinary.baseTag);
        }

        return this.fetchImagesFromCloudinary(categoryTag);
    }
}
