// Utility function for making API requests

// Ensure the environment variable is defined
const API_URL = process.env.NEXT_PUBLIC_API_URL

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL environment variable is not defined.")
}

/**
 * A utility function to make fetch requests to the backend API.
 * Handles base URL, default headers, and basic error handling.
 *
 * @param endpoint The API endpoint (e.g., 'api/auth/login')
 * @param options Standard fetch options (method, body, headers, etc.)
 * @returns The JSON response from the API
 * @throws An error if the network request fails or the API returns an error status
 */
export async function apiFetch<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    // Future enhancement: Add Authorization header if token exists
    // const token = localStorage.getItem('token');
    // if (token) {
    //   defaultHeaders['Authorization'] = `Bearer ${token}`;
    // }
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers, // Allow overriding default headers
      },
    })

    // Attempt to parse JSON regardless of status for potential error messages
    const data = await response.json().catch(() => ({})) // Default to empty object if JSON parsing fails

    if (!response.ok) {
      // Use message from API response if available, otherwise use status text
      const errorMessage = data?.message || response.statusText || `API Error: ${response.status}`
      console.error(`API Error (${response.status}) on ${endpoint}:`, errorMessage, data)
      throw new Error(errorMessage)
    }

    return data as T // Return the parsed JSON data
  } catch (error) {
    // Handle network errors or errors thrown from the !response.ok block
    console.error(`Network or API Error on ${endpoint}:`, error)
    // Re-throw the error to be caught by the calling function
    // Ensure it's an Error object
    if (error instanceof Error) {
      throw error
    } else {
      throw new Error("An unexpected error occurred during the API request.")
    }
  }
}
