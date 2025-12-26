# Immich UI Design Implementation

This project implements the design from Figma with a static screenshot background.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Add the screenshot image:
   - Place your screenshot image in `src/assets/screenshot.png`
   - The image will be used as a static background

3. Start the development server:
```bash
npm start
```

## Design Variables

The project uses design system variables from Figma:
- `--main-blue-900`: #2c346d
- `--neutrals-600`: #404040

These are defined in `src/variables.css` and can be used throughout the project.

## Structure

- `src/components/DesignComponent.tsx` - Main component with screenshot background
- `src/variables.css` - Design system variables
- `src/assets/` - Place screenshot image here

