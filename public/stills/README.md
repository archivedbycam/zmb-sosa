# Stills Gallery Images

This directory contains the hand-selected still images for the gallery component.

## How to add images:

1. Add your still images to this directory (JPG or PNG format)
2. Name them as follows:
   - `still-1.jpg` or `still-1.png`
   - `still-2.jpg` or `still-2.png`
   - `still-3.jpg` or `still-3.png`
   - etc.

3. The gallery component will automatically load these images when they are available.

## Image specifications:
- Format: JPG or PNG
- Recommended resolution: 1920x1080 or higher
- File size: Keep under 2MB per image for optimal loading

## Current placeholder setup:
The gallery currently shows placeholder content. Once you add actual images, uncomment the image rendering code in `src/components/stills-gallery.tsx`:

```tsx
{/* Uncomment when actual images are available */}
<img
  src={stillImages[currentImageIndex]}
  alt={`Still ${currentImageIndex + 1}`}
  className="max-w-full max-h-full object-contain rounded-lg"
/>
``` 