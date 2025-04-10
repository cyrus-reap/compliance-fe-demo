export interface KycUrlRedirectionType {
  failureUrl?: string;
  successUrl?: string;
}

export interface KycParams {
  entityId: string;
  memberId?: string; // Optional: If KYC is for a specific member
}

export interface KycResponse {
  provider: string;
  sdkToken: string;
}
