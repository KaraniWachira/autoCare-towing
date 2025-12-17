# Maintenance Guide

This document provides an overview of the project structure and guidelines for maintaining the Autocare Towing application.

## Project Structure

-   `src/app/components`: Reusable UI components (Header, Footer, Layout, etc.).
-   `src/app/pages`: Route-level components (Home, About, Services, etc.).
-   `src/app/services`: Shared services (Cloudinary, etc.).
-   `src/assets`: Static assets (images, icons).

## Key Architectural Decisions

-   **Standalone Components**: The application uses Angular's standalone components, eliminating the need for `NgModule` boilerplate.
-   **Signals**: State management relies on Angular Signals for reactivity and performance.
-   **Tailwind CSS**: Styling is utility-first using Tailwind. The configuration is in `tailwind.config.js`.
-   **Dark Mode**: The application defaults to a dark theme. Global styles are defined in `src/styles.css` and `src/app/components/layout/layout.component.html`.

## Common Tasks

### Adding a New Page
1.  Generate component: `ng g c pages/new-page`
2.  Add route in `src/app/app.routes.ts`.

### Updating Assets
-   Images are fetched from Cloudinary via `CloudinaryService`.
-   To update hero images, modify the `heroImagePublicIds` array in `HomeComponent`.

### Deployment
To build for production:
```bash
npm run build
```
The output will be in `dist/autocare-towing`.
