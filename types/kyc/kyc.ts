export interface KycUrlRedirectionType {
  failureUrl?: string;
  successUrl?: string;
}

export interface KycParams {
  entityId: string;
  memberId?: string; // Optional: If KYC is for a specific member
  successUrl?: string; // URL to redirect on success
  failureUrl?: string; // URL to redirect on failure
}

export interface KycResponse {
  web_href: string; // The link for the KYC process
}
