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
    reviewStatus: string;
    reviewResult: {
      reviewAnswer: string;
      label: string;
      rejectLabels?: string[];
      reviewRejectType?: string;
    };
  };
  type?: string;
}

export interface SumSubMessage {
  type: string;
  payload: any;
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
  launch: (container: HTMLElement, config: SumSubConfig) => any;
  destroy: () => void;
  setLocale: (locale: string) => void;
  getModuleState: () => any;
}
