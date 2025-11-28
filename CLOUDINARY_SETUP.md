# Cloudinary Setup Instructions

This guide will help you set up Cloudinary for image storage in your towing application.

## Step 1: Create a Cloudinary Account

1. Go to [Cloudinary Sign Up](https://cloudinary.com/users/register/free)
2. Create a free account
3. Verify your email address

## Step 2: Get Your Credentials

1. Log in to your [Cloudinary Console](https://console.cloudinary.com/)
2. On the dashboard, you'll see:
   - **Cloud Name**
   - **API Key**
   - **API Secret** (you won't need this for unsigned uploads)

## Step 3: Create an Upload Preset

For security reasons, we'll use an **unsigned upload preset** which allows client-side uploads without exposing your API secret.

1. In the Cloudinary console, navigate to **Settings** → **Upload**
2. Scroll down to **Upload presets**
3. Click **Add upload preset**
4. Configure the preset:
   - **Preset name**: Choose a name (e.g., `towing_gallery_unsigned`)
   - **Signing mode**: Select **Unsigned**
   - **Folder**: Enter `towing-gallery` (or your preferred folder name)
   - **Upload manipulations**: (Optional) You can set default transformations
5. Click **Save**
6. **Important**: Note down the preset name

## Step 4: Configure Your Application

1. Open the `.env` file in the root of your project
2. Replace the placeholder values with your actual credentials:

```env
CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
CLOUDINARY_API_KEY=your_actual_api_key
CLOUDINARY_UPLOAD_PRESET=towing_gallery_unsigned
CLOUDINARY_FOLDER=towing-gallery
```

3. Open `src/environments/environment.ts`
4. Copy the values from your `.env` file to the environment configuration:

```typescript
export const environment = {
  production: false,
  cloudinary: {
    cloudName: 'your_actual_cloud_name',
    uploadPreset: 'towing_gallery_unsigned',
    apiKey: 'your_actual_api_key',
    folder: 'towing-gallery'
  }
};
```

5. Do the same for `src/environments/environment.prod.ts` (for production builds)

## Step 5: Test the Integration

1. Start your development server:
   ```bash
   npm start
   ```

2. Navigate to the Gallery page
3. Toggle **Admin Mode**
4. Click the **Upload Image** button
5. The Cloudinary upload widget should open
6. Upload a test image
7. Verify the image appears in your gallery and in your Cloudinary Media Library

## Security Notes

- ✅ The `.env` file is already added to `.gitignore` and won't be committed to Git
- ✅ For production deployments, use environment variables in your hosting platform (Vercel, Netlify, etc.)
- ✅ The unsigned upload preset is safe for client-side use
- ⚠️ Never commit your actual API credentials to version control

## Troubleshooting

### Upload widget doesn't open
- Check browser console for errors
- Verify the Cloudinary script is loaded in `index.html`
- Ensure your cloud name is correct

### Upload fails
- Verify the upload preset name is correct
- Ensure the preset signing mode is set to "Unsigned"
- Check that you're not exceeding file size limits (5MB max)

### Images don't display
- Check that the `cloudName` in environment.ts matches your Cloudinary account
- Verify the image was successfully uploaded in Cloudinary console

## Need Help?

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Upload Widget Documentation](https://cloudinary.com/documentation/upload_widget)
- [Angular Integration Guide](https://cloudinary.com/documentation/angular_integration)
