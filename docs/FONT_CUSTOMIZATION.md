# Font Configuration Guide

This project uses a centralized font configuration system that makes it easy to customize typography across the entire application.

## Font Files

### Primary Configuration

- **`app/fonts.ts`** - Main font configuration including Google Fonts setup
- **`app/theme.ts`** - Typography tokens (sizes, weights, spacing)
- **`components/AntdThemeProvider.tsx`** - Ant Design component font integration

## How to Customize Fonts

### 1. Change Font Families

To change the primary fonts, edit `app/fonts.ts`:

```typescript
// Replace Geist with your preferred fonts
import { Inter, Fira_Code } from "next/font/google";

export const primaryFont = Inter({
  variable: "--font-primary",
  subsets: ["latin"],
  display: "swap",
});

export const monoFont = Fira_Code({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});
```

### 2. Adjust Font Sizes

Edit the `typography.sizes` object in `app/fonts.ts`:

```typescript
sizes: {
  xs: "0.75rem",     // Make smaller: "0.6rem"
  sm: "0.875rem",    // Make smaller: "0.75rem"
  base: "1rem",      // Base size (16px)
  lg: "1.125rem",    // Make larger: "1.25rem"
  xl: "1.25rem",     // Make larger: "1.5rem"
  // ... continue for all sizes
}
```

### 3. Modify Font Weights

Adjust font weights in `app/theme.ts`:

```typescript
weight: {
  light: 300,        // Change to 200 for lighter
  normal: 400,       // Default body text
  medium: 500,       // Change to 600 for stronger
  semibold: 600,     // Change to 700
  bold: 700,         // Change to 800 for bolder
  extrabold: 800,    // Change to 900
}
```

### 4. Update Line Heights

Modify line heights for better readability:

```typescript
lineHeights: {
  tight: 1.25,       // For headings: 1.1 for tighter
  normal: 1.5,       // For body text: 1.6 for more space
  relaxed: 1.625,    // For large text: 1.7
  loose: 2,          // For very spaced text: 2.2
}
```

### 5. Adjust Letter Spacing

Fine-tune letter spacing:

```typescript
letterSpacing: {
  tighter: "-0.05em",  // Closer letters
  tight: "-0.025em",   // Slightly closer
  normal: "0em",       // Default
  wide: "0.025em",     // Slightly wider
  wider: "0.05em",     // More space
  widest: "0.1em",     // Maximum space
}
```

## Usage in Components

### Using Theme Tokens

```typescript
import { token } from "@/app/theme";

// In your component styles
style={{
  fontFamily: token.font.family.sans,
  fontSize: token.font.size.lg,
  fontWeight: token.font.weight.medium,
  lineHeight: token.font.leading.normal,
  letterSpacing: token.font.tracking.normal,
}}
```

### Using CSS Classes

```typescript
// The font classes are automatically applied via layout.tsx
// You can also use Tailwind classes that map to your font config
className = "font-medium text-lg leading-normal tracking-normal";
```

## Testing Font Changes

1. **Hot Reload**: Changes to `app/fonts.ts` and `app/theme.ts` will hot-reload
2. **Build Test**: Run `npm run build` to ensure no TypeScript errors
3. **Visual Check**: Check key pages like:
   - Home page hero section
   - Entity list tables
   - Form inputs and buttons
   - Modal dialogs

## Performance Notes

- **Font Display**: Uses `swap` strategy for better performance
- **Preload**: Critical fonts are preloaded
- **Subset**: Only Latin characters loaded for better performance
- **Variables**: CSS custom properties ensure consistent font loading

## Common Customizations

### Corporate Branding

```typescript
// Use your company's brand fonts
import { Corporate_Font } from "next/font/google";

export const primaryFont = Corporate_Font({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
```

### Accessibility

```typescript
// Larger base size for better readability
sizes: {
  base: "1.125rem",  // 18px instead of 16px
  lg: "1.25rem",     // 20px
  // ...
}
```

### Dense UI

```typescript
// Smaller sizes for compact interfaces
sizes: {
  xs: "0.6875rem",   // 11px
  sm: "0.75rem",     // 12px
  base: "0.875rem",  // 14px
  // ...
}
```

## Troubleshooting

- **Fonts not loading**: Check that font files are properly imported in `app/fonts.ts`
- **Inconsistent sizing**: Ensure all components use theme tokens instead of hardcoded values
- **Build errors**: Verify TypeScript types match between font config and usage
- **Performance issues**: Check that only necessary font weights/subsets are loaded
