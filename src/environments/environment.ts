// Development environment configuration
// IMPORTANT: Copy your credentials from the .env file to here
// Note: Angular bundles these at build time, so you need to manually copy values from .env
// The .env file is in the root directory and should not be committed to git

export const environment = {
    production: false,
    cloudinary: {
        // Get credentials from: https://console.cloudinary.com/
        cloudName: 'dmqpghczj',
        uploadPreset: 'autocare-towing',
        folder: 'towing-gallery',
        baseTag: 'autocare-towing',  // Base tag for all images
        categoryTags: {
            'saloon-cars': 'saloon-cars',
            'suvs': 'suvs',
            'heavy-machinery': 'heavy-machinery',
            'others': 'others'
        }
    }
};
