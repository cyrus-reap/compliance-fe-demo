export interface SumSubApplicant {
  id: string;
  externalUserId?: string;
  inspectionId?: string;
  correlationId?: string;
  createdAt?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  review?: {
    reviewId: string;
    reviewStatus: SumSubReviewStatus;
    reviewResult: {
      reviewAnswer: string;
      label: string;
      rejectLabels?: string[];
      reviewRejectType?: string;
    };
  };
  type?: string;
}

// Add enum for review statuses
export enum SumSubReviewStatus {
  INIT = "init",
  PENDING = "pending",
  PRECHECKED = "prechecked",
  QUEUED = "queued",
  COMPLETED = "completed",
  ON_HOLD = "onHold",
}

export interface SumSubMessage {
  type: string;
  payload: any;
}

// Add more specific type definitions for event payloads
export interface SumSubStepCompletedPayload {
  applicantId?: string;
  inspectionId?: string;
  idDocSetType?: string; // The type of document set completed
  docType?: string;
  clientId?: string;
}

export interface SumSubApplicantStatusChangedPayload {
  applicantId: string;
  inspectionId?: string;
  externalUserId?: string;
  reviewStatus: SumSubReviewStatus;
  clientId?: string;
}

export interface SumSubApplicantCreatedPayload {
  applicantId: string;
  inspectionId: string;
  externalUserId?: string;
  clientId?: string;
}

export interface SumSubErrorPayload {
  applicantId?: string;
  inspectionId?: string;
  description?: string;
  code?: string;
}

export interface SumSubConfig {
  uiConf?: {
    customCssStr?: string;
    languageCode?: string;
    steps?: {
      idDoc?: {
        documentTypes?: string[];
        countries?: string[];
      };
    };
    requiredIdDocs?: {
      docType: string;
      country: string;
    }[];
  };
  onMessage?: (type: string, payload: any) => void;
  onError?: (error: Error) => void;
  onStateChange?: (event: string) => void;
}

export interface SumSubSdk {
  launch: (container: HTMLElement | string, config?: SumSubConfig) => any;
  destroy: () => void;
  setLocale: (locale: string) => void;
  getModuleState: () => any;
}
