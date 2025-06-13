# KYC/Compliance Platform - Technical Specifications

## 🎯 System Overview

The KYC/Compliance Platform is a modern web application designed for financial institutions to manage customer verification, document processing, and regulatory compliance workflows. Built with Next.js 15 and integrated with AWS services for scalability and real-time capabilities.

---

## 🏛️ Architecture Specification

### **Frontend Architecture**

```
├── app/                    # Next.js 15 App Router
│   ├── api/               # API routes
│   │   └── webhook/       # Real-time notification handler
│   ├── kyc/              # KYC workflow pages
│   │   ├── entities/     # Entity management pages
│   │   └── entity/       # Individual entity pages
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # Reusable UI components
│   ├── shared/          # Cross-feature components
│   ├── kyc/            # KYC-specific components
│   ├── entities/       # Entity management UI
│   ├── features/       # Feature requirement components
│   ├── layout/         # Layout components
│   └── home/           # Homepage components
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── api/                # API layer utilities
├── constants/          # Application constants
└── specs/              # Project documentation
```

### **Backend Services**

- **API Layer**: Next.js API routes with TypeScript
- **Real-time**: AWS AppSync GraphQL subscriptions
- **Storage**: AWS Amplify DataStore
- **Authentication**: AWS Cognito (planned)
- **File Storage**: AWS S3 with presigned URLs

---

## 🔧 Technical Requirements

### **Core Technologies**

#### **Frontend Stack**

| Technology    | Version | Purpose                             |
| ------------- | ------- | ----------------------------------- |
| Next.js       | 15.1.3  | React framework with App Router     |
| React         | 19.0.0  | UI library with concurrent features |
| TypeScript    | 5.x     | Type-safe development               |
| Ant Design    | 5.23.0  | Enterprise UI component library     |
| Tailwind CSS  | 3.4.1   | Utility-first CSS framework         |
| Framer Motion | 12.6.3  | Animation library                   |

#### **Backend & Integration**

| Technology     | Version | Purpose                      |
| -------------- | ------- | ---------------------------- |
| AWS Amplify    | 6.14.2  | Cloud backend platform       |
| TanStack Query | 5.62.16 | Data fetching and caching    |
| Axios          | 1.7.9   | HTTP client                  |
| Socket.io      | 4.8.1   | WebSocket communication      |
| Sumsub WebSDK  | 2.3.13  | KYC verification integration |

#### **Development Tools**

| Tool           | Version  | Purpose                 |
| -------------- | -------- | ----------------------- |
| ESLint         | 9.x      | Code linting            |
| Prettier       | Latest   | Code formatting         |
| GitHub Copilot | Latest   | AI-assisted coding      |
| Turbopack      | Built-in | Fast development builds |

---

## 🔌 API Specifications

### **Webhook API** (`/api/webhook`)

#### **POST /api/webhook**

Receives real-time notifications from external KYC/compliance services.

**Request Headers:**

```typescript
Content-Type: application/json
```

**Request Body Types:**

1. **KYC Event Payload**

```typescript
interface KYCEventPayload {
  eventName: string; // e.g., "VERIFICATION_COMPLETED"
  entityUuid: string; // Unique entity identifier
  eventType: string; // e.g., "DOCUMENT_UPLOADED"
  channel: string; // Communication channel
  details?: {
    status?: string; // "approved" | "rejected" | "pending"
    slug?: string; // Event identifier
  };
  message?: string; // Optional descriptive message
}
```

2. **Generic Message Payload**

```typescript
interface GenericPayload {
  message: string; // Direct message content
}
```

**Response:**

```typescript
// Success
{
  success: true;
}

// Error
{
  error: string;
} // HTTP 400
```

#### **GET /api/webhook**

Retrieves recent notifications (last 20).

**Response:**

```typescript
interface Notification {
  id: string; // Generated unique ID
  message: string; // Formatted notification message
  createdAt: number; // Unix timestamp
}

type NotificationsResponse = Notification[];
```

---

## 🗄️ Data Models

### **Entity Management**

```typescript
// From types/entity/entity.ts
interface Entity {
  uuid: string; // Primary identifier
  status: EntityStatus; // Verification status
  createdAt: Date; // Creation timestamp
  updatedAt: Date; // Last modification
  personalInfo: PersonalInfo; // Customer details
  documents: Document[]; // Uploaded files
  verificationHistory: Event[]; // Audit trail
}

type EntityStatus =
  | "pending"
  | "under_review"
  | "approved"
  | "rejected"
  | "requires_action";
```

### **Entity Member Management**

```typescript
// From types/entity-member/entity-member.ts
interface EntityMember {
  id: string; // Member identifier
  entityUuid: string; // Parent entity
  role: MemberRole; // Member role
  personalInfo: PersonalInfo; // Member details
  permissions: Permission[]; // Access rights
  status: MemberStatus; // Active/inactive
}
```

### **Document Management**

```typescript
// From types/file-upload/file-upload.ts
interface Document {
  id: string; // Document identifier
  entityUuid: string; // Parent entity
  type: DocumentType; // Document category
  filename: string; // Original filename
  s3Key: string; // AWS S3 storage key
  uploadedAt: Date; // Upload timestamp
  status: DocumentStatus; // Processing status
  metadata: DocumentMetadata; // Additional properties
}

type DocumentType =
  | "passport"
  | "drivers_license"
  | "national_id"
  | "proof_of_address"
  | "bank_statement";
```

### **Feature Requirements**

```typescript
// From types/feature-requirements/feature.requirements.ts
interface FeatureRequirement {
  id: string; // Requirement identifier
  featureId: string; // Parent feature
  title: string; // Requirement title
  description: string; // Detailed description
  type: RequirementType; // Category
  priority: Priority; // Business priority
  status: RequirementStatus; // Implementation status
  acceptanceCriteria: string[]; // Validation criteria
}
```

### **KYC Verification**

```typescript
// From types/kyc/kyc.ts
interface KYCVerification {
  id: string; // Verification session ID
  entityUuid: string; // Subject entity
  provider: KYCProvider; // Verification service
  status: VerificationStatus; // Current status
  documents: VerificationDocument[]; // Submitted documents
  results: VerificationResult; // Verification outcome
  createdAt: Date; // Session start
  completedAt?: Date; // Session completion
}
```

---

## 🔐 Security Specifications

### **Environment Variables**

```bash
# AWS Configuration
NEXT_PUBLIC_APPSYNC_ENDPOINT=    # GraphQL endpoint
NEXT_PUBLIC_APPSYNC_API_KEY=     # API authentication key

# Third-party Integrations
SUMSUB_API_KEY=                  # KYC provider key
SUMSUB_SECRET_KEY=               # KYC provider secret

# File Upload Configuration
S3_BUCKET_NAME=                  # Document storage bucket
S3_REGION=                       # AWS region

# Application Configuration
NEXT_PUBLIC_APP_ENV=             # Environment identifier
```

### **Data Protection**

- **Encryption**: All sensitive data encrypted at rest and in transit
- **Input Validation**: Comprehensive payload validation on all endpoints
- **Rate Limiting**: API endpoints protected against abuse
- **CORS**: Properly configured for production domains
- **Secrets Management**: No hardcoded credentials in codebase
- **File Security**: Presigned URLs for secure file access

---

## 🔑 API Key Management

### **Custom API Key Feature**

The application now supports optional user-provided API keys for testing and development:

#### **User Interface**

- **Header Integration**: Settings button in the desktop navigation
- **Modal Dialog**: Secure configuration interface
- **Toggle Switch**: Enable/disable custom API key usage
- **Validation**: Real-time key validation with security warnings
- **Status Display**: Current API key configuration shown in security card

#### **Security Features**

```typescript
// Security measures implemented:
- Session-only storage (no persistence)
- Production key detection and warnings
- API key redaction in logs
- Secure input field with password masking
- Clear key removal on disable
```

#### **API Integration**

```typescript
// Enhanced API functions support custom keys:
createEntity(data, customApiKey?)
fetchKycLink(params, customApiKey?)
fetchFeatures(page, limit, customApiKey?)
fetchFeatureRequirements(featureId, customApiKey?)
```

---

## 🎨 UI/UX Specifications

### **Design System**

- **Component Library**: Ant Design 5.x with custom theming
- **Color Palette**: Professional compliance-focused theme
- **Typography**: System fonts with fallbacks
- **Spacing**: Tailwind CSS utility classes (4px grid system)
- **Breakpoints**: Mobile-first responsive design
- **Icons**: Ant Design icons with custom SVG supplements

### **Component Architecture**

```typescript
// Shared components pattern
interface SharedComponentProps {
  className?: string; // Tailwind classes
  children?: React.ReactNode; // Nested content
  loading?: boolean; // Loading state
  error?: string; // Error message
}

// KYC-specific components
interface KYCComponentProps extends SharedComponentProps {
  entityUuid: string; // Entity context
  onStatusChange?: (status: EntityStatus) => void;
  onError?: (error: Error) => void;
}
```

### **Accessibility Requirements**

- **WCAG 2.1 AA** compliance
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Readers**: Proper ARIA labels and roles
- **Color Contrast**: Minimum 4.5:1 ratio
- **Focus Management**: Clear focus indicators
- **Form Validation**: Clear error messaging

---

## 🚀 Performance Requirements

### **Loading Performance**

- **First Contentful Paint**: < 1.5 seconds
- **Time to Interactive**: < 3 seconds
- **Cumulative Layout Shift**: < 0.1
- **Bundle Size**: < 500KB initial load
- **Component Lazy Loading**: Dynamic imports for heavy components

### **Runtime Performance**

- **Memory Usage**: < 100MB average
- **CPU Usage**: < 10% on modern devices
- **API Response Time**: < 500ms average
- **Real-time Updates**: < 100ms latency
- **File Upload**: Progress tracking and error handling

---

## 🧪 Testing Strategy

### **Unit Testing**

- **Framework**: Jest + React Testing Library
- **Coverage**: Minimum 80% code coverage
- **Components**: Isolated component testing
- **Hooks**: Custom hook testing with renderHook
- **Utilities**: Pure function testing

### **Integration Testing**

- **API Routes**: Full request/response cycle testing
- **Database**: Mock external service interactions
- **Real-time**: WebSocket connection testing
- **File Upload**: S3 integration testing

### **End-to-End Testing**

- **Framework**: Playwright (planned)
- **User Flows**: Critical KYC workflow testing
- **Cross-browser**: Chrome, Firefox, Safari support
- **Mobile Testing**: Responsive design validation

---

## 📱 Mobile Specifications

### **Responsive Breakpoints**

```css
/* Tailwind CSS breakpoints */
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet portrait */
lg: 1024px  /* Tablet landscape */
xl: 1280px  /* Desktop */
2xl: 1536px /* Large desktop */
```

### **Mobile-First Features**

- **Touch Optimization**: Minimum 44px touch targets
- **Progressive Web App**: Service worker implementation (planned)
- **Offline Support**: Critical features available offline
- **Performance**: Optimized for 3G networks
- **File Upload**: Mobile camera integration

---

## 🔄 Integration Specifications

### **External Services**

1. **Sumsub KYC Platform**

   - SDK: `@sumsub/websdk-react`
   - Purpose: Identity verification and document processing
   - Integration: Embedded widget + webhook callbacks
   - Components: `SumsubVerificationStep.tsx`

2. **AWS Services**
   - **AppSync**: Real-time GraphQL subscriptions
   - **S3**: Document storage with presigned URLs
   - **Cognito**: User authentication (planned)
   - **Lambda**: Serverless function processing (planned)

### **Custom Hooks Integration**

```typescript
// Entity management hooks
useGetEntitiesHook(); // Fetch entity list
useGetEntityDetailsHook(); // Fetch single entity
usePostEntityHook(); // Create new entity

// KYC verification hooks
useEntityVerification(); // Verification workflow
useGetKycLinkHook(); // KYC session links

// File upload hooks
useUploadFileHook(); // File upload handling
useGetPresignedPostFileUrlHook(); // S3 presigned URLs

// Feature management hooks
useGetFeaturesHook(); // Feature list
useGetFeatureRequirementsHook(); // Feature requirements
```

---

## 🚢 Deployment Specifications

### **Development Environment**

- **Local Development**: Next.js dev server with Turbopack
- **Hot Reload**: Instant feedback on code changes
- **Environment**: Local environment variables
- **Database**: Mock/development AWS services
- **File Storage**: Local development S3 bucket

### **Production Environment** (Planned)

- **Platform**: Vercel or AWS Amplify hosting
- **CDN**: Global content delivery network
- **SSL**: Automatic HTTPS certificate management
- **Monitoring**: Real-time error tracking and performance monitoring
- **Scaling**: Auto-scaling based on traffic patterns

---

## 📊 Monitoring & Analytics

### **Performance Monitoring**

- **Core Web Vitals**: Automatic tracking with Vercel Analytics
- **Error Tracking**: Comprehensive error logging
- **API Monitoring**: Response time and error rate tracking
- **User Analytics**: Privacy-compliant usage analytics
- **File Upload Monitoring**: Success/failure rates

### **Business Metrics**

- **KYC Completion Rate**: Percentage of successful verifications
- **Processing Time**: Average time from submission to approval
- **Error Rate**: Failed verification attempts
- **User Satisfaction**: NPS and feedback scoring
- **Feature Adoption**: Usage analytics for new features

---

## 🔍 Query Management

### **TanStack Query Configuration**

```typescript
// From constants/query-keys.ts
const queryKeys = {
  entities: ["entities"] as const,
  entity: (id: string) => ["entity", id] as const,
  features: ["features"] as const,
  requirements: (featureId: string) => ["requirements", featureId] as const,
  kyc: (entityId: string) => ["kyc", entityId] as const,
  notifications: ["notifications"] as const,
};
```

### **Data Fetching Patterns**

- **Infinite Queries**: For paginated entity lists
- **Parallel Queries**: For dashboard data loading
- **Dependent Queries**: For entity-specific requirements
- **Real-time Subscriptions**: For notification updates
- **Optimistic Updates**: For immediate UI feedback

---

## 🎯 Component Specifications

### **Layout Components**

```typescript
// AppHeader.tsx - Main navigation
interface AppHeaderProps {
  user?: User;
  notifications?: Notification[];
  onMenuToggle?: () => void;
}

// AppFooter.tsx - Footer with links
interface AppFooterProps {
  className?: string;
  showLinks?: boolean;
}

// MainContent.tsx - Content wrapper
interface MainContentProps {
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  children: React.ReactNode;
}
```

### **KYC Components**

```typescript
// EntityCreationStep.tsx - Entity creation
interface EntityCreationStepProps {
  onEntityCreated: (entity: Entity) => void;
  onError: (error: Error) => void;
  initialData?: Partial<Entity>;
}

// SumsubVerificationStep.tsx - Verification
interface SumsubVerificationStepProps {
  entityUuid: string;
  token: string;
  onVerificationComplete: (result: VerificationResult) => void;
}
```

---

_This specification document is maintained alongside the codebase and updated with each major feature release. All implementations follow GitHub Copilot best practices for code generation and review._
