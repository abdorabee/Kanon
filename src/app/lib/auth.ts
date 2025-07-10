// Authentication utility functions

// In-memory token cache for development
let cachedToken: string | null = null;
let tokenExpiry: number = 0;

/**
 * Validates a JWT token by making a test API call
 * @param token The JWT token to validate
 * @returns Boolean indicating if the token is valid
 */
export async function validateToken(token: string): Promise<boolean> {
  if (!token) return false;
  
  try {
    // Make a simple API call to test the token
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.kanony.xyz';
    const testUrl = `${baseUrl}/api/v2/cases/?skip=0&limit=1`;
    
    const response = await fetch(testUrl, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      cache: 'no-store'
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
}

/**
 * Obtains a fresh authentication token by logging in
 * @returns The access token or null if login fails
 */
async function loginAndGetToken(): Promise<string | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.kanony.xyz';
  const loginUrl = `${baseUrl}/api/v2/token`;
  
  try {
    console.log('Attempting to get a fresh token...');
    
    // Use credentials from environment if available, otherwise use defaults
    const username = process.env.API_USERNAME || 'admin';
    const password = process.env.API_PASSWORD || 'admin_kanony_MEDA';
    
    // Form data for login
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    
    const response = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'accept': 'application/json'
      },
      body: formData.toString(),
      cache: 'no-store'
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Login failed: ${response.status} ${response.statusText}`);
      console.error('Error details:', errorText);
      return null;
    }
    
    const data = await response.json();
    console.log('Successfully obtained new access token');
    
    // Cache the token for development mode
    if (process.env.NODE_ENV === 'development') {
      cachedToken = data.access_token;
      // Set expiry to 1 hour from now (or use actual expiry from token if available)
      tokenExpiry = Date.now() + (60 * 60 * 1000);
    }
    
    return data.access_token;
  } catch (error) {
    console.error('Error during login:', error);
    return null;
  }
}

/**
 * Gets a valid access token, either from cache, environment, or by logging in
 * @returns A valid access token or null if unable to obtain one
 */
export async function getAccessToken(): Promise<string | null> {
  // First try: Check if we have a valid token in the environment
  if (process.env.NODE_ENV === 'development' && process.env.API_TOKEN) {
    console.log('Checking API_TOKEN from environment');
    const token = process.env.API_TOKEN;
    
    // Validate the token
    const isValid = await validateToken(token);
    if (isValid) {
      console.log('Environment token is valid');
      return token;
    } else {
      console.log('Environment token is invalid or expired');
    }
  }
  
  // Second try: Check if we have a valid cached token
  const now = Date.now();
  if (cachedToken && tokenExpiry > now) {
    console.log('Checking cached token');
    // Validate the cached token
    const isValid = await validateToken(cachedToken);
    if (isValid) {
      console.log('Using valid cached token');
      return cachedToken;
    } else {
      console.log('Cached token is invalid');
      cachedToken = null;
    }
  }
  
  // Third try: Get a fresh token by logging in
  console.log('Getting fresh token by logging in');
  return await loginAndGetToken();
}

/**
 * Makes an authenticated API request
 * @param url The API endpoint URL
 * @param options Fetch options
 * @returns The fetch response or null if authentication fails
 */
export async function authenticatedFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response | null> {
  // Get a valid token
  const token = await getAccessToken();
  
  if (!token) {
    console.error('Failed to obtain authentication token');
    return null;
  }
  
  // Add authorization header
  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${token}`,
    'accept': 'application/json'
  };
  
  try {
    // Make the authenticated request
    const response = await fetch(url, {
      ...options,
      headers,
      cache: 'no-store', // Don't use cache to ensure fresh requests
      credentials: 'include', // Add credentials inclusion
    });
    
    return response;
  } catch (error) {
    console.error('Error making authenticated request:', error);
    return null;
  }
}
