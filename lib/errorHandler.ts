import toast from "react-hot-toast";


export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: any;
}

export class ErrorHandler {
  static handle(error: any, context?: string): ApiError {
    console.error(`Error in ${context || "unknown context"}:`, error);

    let apiError: ApiError = {
      message: "An unexpected error occurred",
      code: "UNKNOWN_ERROR"
    };

    if (error.response) {
      // API response error
      apiError = {
        message: error.response.data?.message || error.response.data?.error || "API request failed",
        code: error.response.data?.code || "API_ERROR",
        status: error.response.status,
        details: error.response.data
      };
    } else if (error.request) {
      // Network error
      apiError = {
        message: "Network error - please check your connection",
        code: "NETWORK_ERROR"
      };
    } else if (error.message) {
      // Generic error
      apiError = {
        message: error.message,
        code: "GENERIC_ERROR"
      };
    }

    return apiError;
  }

  static showError(error: ApiError, context?: string): void {
    const message = context ? `${context}: ${error.message}` : error.message;

    switch (error.code) {
      case "NETWORK_ERROR":
        toast.error("Please check your internet connection and try again");
        break;
      case "VALIDATION_ERROR":
        toast.error("Please check your input and try again"
        );
        break;
      case "AUTH_ERROR":
        toast.error("Please log in again");
        break;
      default:
        toast.error(message);
    }
  }

  static async withErrorHandling<T>(
    operation: () => Promise<T>,
    context?: string
  ): Promise<T | null> {
    try {
      return await operation();
    } catch (error) {
      const apiError = this.handle(error, context);
      this.showError(apiError, context);
      return null;
    }
  }
}

// API wrapper with error handling
export const apiCall = async <T>(
  operation: () => Promise<T>,
  context?: string
): Promise<T | null> => {
  return ErrorHandler.withErrorHandling(operation, context);
};
