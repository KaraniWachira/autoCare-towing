// Production environment configuration
// IMPORTANT: Copy your credentials from the .env file to here
// For production, you may want to use different credentials or CI/CD environment variables

export const environment = {
    production: true,
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
