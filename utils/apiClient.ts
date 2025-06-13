/**
 * API Client Utility
 *
 * Provides a centralized way to make API calls with proper API key handling:
 * - Supports both system and user-provided API keys
 * - Ensures API keys are never logged or exposed
 * - Provides consistent error handling
 * - Type-safe request/response handling
 */

"use client";

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// API client configuration interface
export interface ApiClientConfig {
  baseURL: string;
  apiKey: string;
  timeout?: number;
}

// Custom error class for API-related errors
export class ApiError extends Error {
  public status?: number;
  public code?: string;

  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

// Create API client instance with proper headers and error handling
export const createApiClient = (config: ApiClientConfig) => {
  const { baseURL, apiKey, timeout = 30000 } = config;

  // Create axios instance with base configuration
  const client = axios.create({
    baseURL,
    timeout,
    headers: {
      "Content-Type": "application/json",
      "x-reap-api-key": apiKey, // Use provided API key (system or custom)
    },
  });

  // Request interceptor - ensure sensitive data is not logged
  client.interceptors.request.use(
    (config) => {
      // Never log the actual API key for security
      const debugConfig = {
        ...config,
        headers: {
          ...config.headers,
          "x-reap-api-key": "[REDACTED]",
        },
      };

      // Only log in development and without sensitive data
      if (process.env.NODE_ENV === "development") {
        console.log("[API Request]", {
          method: config.method?.toUpperCase(),
          url: config.url,
          params: config.params,
        });
      }

      return config;
    },
    (error) => {
      console.error("[API Request Error]", error);
      return Promise.reject(error);
    }
  );

  // Response interceptor - handle errors consistently
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      // Log successful responses in development (without sensitive data)
      if (process.env.NODE_ENV === "development") {
        console.log("[API Response]", {
          status: response.status,
          url: response.config.url,
          dataType: typeof response.data,
        });
      }
      return response;
    },
    (error) => {
      // Create user-friendly error messages
      let message = "An unexpected error occurred";
      let status: number | undefined;
      let code: string | undefined;

      if (error.response) {
        // Server responded with error status
        status = error.response.status;
        message =
          error.response.data?.message ||
          error.response.data?.error ||
          `Server error (${status})`;
        code = error.response.data?.code;

        // Handle specific error cases
        if (status === 401) {
          message = "Invalid API key or authentication failed";
        } else if (status === 403) {
          message = "Access forbidden - check your API key permissions";
        } else if (status === 429) {
          message = "Rate limit exceeded - please try again later";
        }
      } else if (error.request) {
        // Request made but no response received
        message = "Network error - please check your connection";
      }

      // Log error without exposing sensitive information
      console.error("[API Error]", {
        message,
        status,
        code,
        url: error.config?.url,
      });

      return Promise.reject(new ApiError(message, status, code));
    }
  );

  return client;
};

// React hook to get API client with current API key configuration
export const useApiClient = () => {
  // This will be used by the updated API functions
  // For now, we'll create a function that components can call
  return (apiKey: string) => {
    const baseURL = process.env.NEXT_PUBLIC_COMPLIANCE_API_URL;

    if (!baseURL) {
      throw new Error(
        "NEXT_PUBLIC_COMPLIANCE_API_URL environment variable is not set"
      );
    }

    if (!apiKey) {
      throw new Error("API key is required");
    }

    return createApiClient({
      baseURL,
      apiKey,
    });
  };
};

// Utility function for making API calls with custom API key support
export const makeApiCall = async <T = any>(
  apiKey: string,
  config: AxiosRequestConfig
): Promise<T> => {
  const baseURL = process.env.NEXT_PUBLIC_COMPLIANCE_API_URL;

  if (!baseURL) {
    throw new Error(
      "NEXT_PUBLIC_COMPLIANCE_API_URL environment variable is not set"
    );
  }

  const client = createApiClient({ baseURL, apiKey });
  const response = await client.request<T>(config);
  return response.data;
};
