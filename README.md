# KYC/Compliance Platform Demo

A modern, minimalist web application for KYC (Know Your Customer) and compliance management, built with Next.js 15, TypeScript, Ant Design, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (recommended: 20+)
- npm, yarn, pnpm, or bun

### Installation

```bash
git clone <your-repo-url>
cd compliance-fe-demo
npm install
```

### Development

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## 🎨 Customizing for Your Brand

### 1. Update Theme Colors

Edit `app/theme.ts` to customize your brand colors:

```typescript
export const token = {
  color: {
    // Primary brand colors - Update these for your brand
    lightViolet: {
      100: "#F9F7FD", // Light background
      300: "#E2D6F5", // Hover states
      700: "#806AAA", // Primary brand color
      1000: "#3C2A59", // Dark brand color
    },
    // Secondary colors
    green: {
      600: "#10B981", // Success states
    },
    red: {
      600: "#FF4E4E", // Error states
    },
    // Add your custom colors here
  },
};
```

### 2. Update Typography

Modify `app/fonts.ts` for custom fonts:

```typescript
import { Inter, Roboto } from "next/font/google";

// Replace with your preferred fonts
const primaryFont = Inter({
  subsets: ["latin"],
  variable: "--font-primary",
  display: "swap",
});

export const fontConfig = {
  className: `${primaryFont.variable}`,
  fonts: {
    primary: primaryFont,
  },
  // Typography scale - customize sizes
  typography: {
    h1: { fontSize: "2rem", fontWeight: 600 },
    h2: { fontSize: "1.5rem", fontWeight: 600 },
    body: { fontSize: "0.875rem", fontWeight: 400 },
    // Add more sizes as needed
  },
};
```

### 3. Update Logo and Branding

Replace files in `public/logo/` with your brand assets:

- `android-chrome-192x192.png`
- `android-chrome-512x512.png`
- `apple-touch-icon.png`
- `favicon-16x16.png`
- `favicon-32x32.png`

Update `app/layout.tsx` metadata:

```typescript
export const metadata: Metadata = {
  title: "Your Company - KYC Platform",
  description: "Your custom description",
  icons: {
    icon: "/logo/favicon-32x32.png",
    apple: "/logo/apple-touch-icon.png",
  },
};
```

## 🔄 How the KYC Flow Works

### 1. Entity Creation Flow

```
User Input → Entity Creation → Feature Selection → Document Upload → Verification
```

1. **Entity Creation**: Users create business entities with basic information
2. **Feature Selection**: Choose compliance features (AML, KYC, etc.)
3. **Document Upload**: Secure file upload to AWS S3
4. **Verification**: Integration with Sumsub for identity verification
5. **Status Tracking**: Real-time updates on verification progress

### 2. Key Components

- **EntityList**: Display and manage all entities
- **VerificationStatusSteps**: Visual progress indicator
- **FileUpload**: Secure document upload with progress
- **RequirementTable**: Feature-specific compliance requirements

### 3. API Integration

The platform integrates with:

- **Sumsub**: Identity verification service
- **AWS S3**: Secure file storage
- **Your Backend**: Custom compliance logic

## 📁 Project Structure

```
compliance-fe-demo/
├── app/                    # Next.js 15 App Router
│   ├── api/               # API routes
│   ├── kyc/              # KYC workflow pages
│   ├── layout.tsx        # Root layout
│   ├── theme.ts          # Brand colors & tokens
│   └── fonts.ts          # Typography configuration
├── components/           # Reusable UI components
│   ├── shared/          # Cross-feature components
│   ├── kyc/            # KYC-specific UI
│   ├── entities/       # Entity management
│   ├── features/       # Feature requirements
│   └── layout/         # Layout components
├── hooks/              # Custom React hooks
├── types/              # TypeScript definitions
├── api/                # API client utilities
└── public/             # Static assets
```

## 🛠️ Technology Stack

### Frontend

- **Next.js 15**: App Router, Server Components
- **React 19**: Latest React features
- **TypeScript**: Type safety throughout
- **Ant Design**: Enterprise-class UI components
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Smooth animations
- **React Query**: Data fetching & caching

### Integration & Services

- **Sumsub**: Identity verification
- **AWS Amplify**: Backend integration
- **Socket.io**: Real-time updates
- **Formik + Yup**: Form handling & validation

## 🎯 Key Features

### ✨ Minimalist Design

- Clean, professional interface
- Consistent spacing and typography
- Accessible color contrast
- Responsive design

### 🔒 Security First

- Secure file uploads
- Input validation and sanitization
- Error boundaries for production safety
- Type-safe API interactions

### 🚀 Performance Optimized

- Server-side rendering
- Optimized font loading
- Code splitting
- Image optimization

### ♿ Accessibility

- ARIA labels and roles
- Keyboard navigation
- Focus management
- Screen reader support

## 🔧 Configuration

### Environment Variables

Create `.env.local`:

```bash
# Sumsub Configuration
NEXT_PUBLIC_SUMSUB_API_URL=your_sumsub_api_url
NEXT_PUBLIC_SUMSUB_APP_TOKEN=your_app_token

# AWS Configuration
NEXT_PUBLIC_AWS_REGION=your_aws_region
NEXT_PUBLIC_S3_BUCKET=your_s3_bucket

# API Configuration
NEXT_PUBLIC_API_BASE_URL=your_api_base_url
```

### Sumsub Integration

1. Sign up for Sumsub account
2. Get your App Token and API URL
3. Configure webhook endpoints
4. Update verification flow in `components/kyc/SumsubVerificationStep.tsx`

### AWS S3 Setup

1. Create S3 bucket for file storage
2. Configure CORS for file uploads
3. Set up IAM roles for presigned URLs
4. Update `api/s3-file-upload.ts` with your configuration

## 🚢 Deployment

### Vercel (Recommended)

```bash
npm run build
# Deploy to Vercel
vercel --prod
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment-Specific Builds

```bash
# Development
npm run dev

# Production build
npm run build
npm start

# Linting
npm run lint
```

## 🎨 UI/UX Guidelines

### Design Principles

- **Minimalist**: Clean, uncluttered interfaces
- **Consistent**: Unified design language
- **Accessible**: WCAG 2.1 compliant
- **Responsive**: Mobile-first approach

### Color Usage

- **Primary**: `#806AAA` (lightViolet.700) for main actions
- **Success**: `#10B981` (green.600) for completed states
- **Warning**: `#F59E0B` for attention items
- **Error**: `#FF4E4E` (red.600) for error states

### Typography Scale

- **H1**: 2rem, weight 600 - Page titles
- **H2**: 1.5rem, weight 600 - Section headers
- **Body**: 0.875rem, weight 400 - Regular text
- **Caption**: 0.75rem, weight 400 - Helper text

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit a pull request

### Code Standards

- Use TypeScript for all new code
- Follow the established component patterns
- Add JSDoc comments for complex functions
- Ensure accessibility standards
- Test your changes thoroughly

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Ant Design Components](https://ant.design/components/overview/)
- [Tailwind CSS Utilities](https://tailwindcss.com/docs)
- [Sumsub Integration Guide](https://developers.sumsub.com/)
- [AWS Amplify Documentation](https://docs.amplify.aws/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Need help?** Check the `/specs/` directory for detailed technical specifications and project documentation.
