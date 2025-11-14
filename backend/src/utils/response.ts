/**
 * @summary
 * Response formatting utilities
 *
 * @module utils/response
 *
 * @description
 * Provides standardized response formatting for API endpoints
 */

export interface SuccessResponse<T> {
  success: true;
  data: T;
  metadata?: {
    page?: number;
    pageSize?: number;
    total?: number;
    timestamp: string;
  };
}

export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
}

export const successResponse = <T>(data: T, metadata?: any): SuccessResponse<T> => {
  return {
    success: true,
    data,
    metadata: {
      ...metadata,
      timestamp: new Date().toISOString(),
    },
  };
};

export const errorResponse = (
  message: string,
  code: string = 'ERROR',
  details?: any
): ErrorResponse => {
  return {
    success: false,
    error: {
      code,
      message,
      details,
    },
    timestamp: new Date().toISOString(),
  };
};
