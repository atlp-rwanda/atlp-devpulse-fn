import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';

interface DecodedToken {
  exp?: number;
  iat?: number; 
  data?: {
    email: string;
  };
  email?: string;
}

class TokenExpirationHandler {
  private static readonly STORAGE_KEYS = {
    ACCESS_TOKEN: 'access_token',
    TOKEN_ISSUED_TIME: 'token_issued_time', 
  } as const;

  private static readonly LOGIN_ROUTE = '/login';

  private static showToast(message: string) {
    toast.error(message);
  }

  private static clearAuthData() {
    localStorage.clear();
  }

  private static redirect() {
    window.location.href = this.LOGIN_ROUTE;
  }

  private static handleRedirection(message: string) {
    this.showToast(message);
    this.clearAuthData();
    setTimeout(() => this.redirect(), 400);
  }

  public static isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const tokenIssuedTime = localStorage.getItem(this.STORAGE_KEYS.TOKEN_ISSUED_TIME);
      const issuedTime = tokenIssuedTime ? parseInt(tokenIssuedTime, 10) : null;

     
      const currentTime = Date.now() / 1000; 

     
      const tokenIat = issuedTime || decoded.iat;
      if (!tokenIat) return false;

      const timeElapsedSinceIssue = currentTime - tokenIat;
      const ExTime = 60 * 60; 

     
      return timeElapsedSinceIssue > ExTime;
    } catch {
      return true; 
    }
  }

  public static validateToken(): boolean {
    const token = localStorage.getItem(this.STORAGE_KEYS.ACCESS_TOKEN);

    if (!token) {
      this.handleRedirection('Please login to continue');
      return false;
    }

    if (this.isTokenExpired(token)) {
      this.handleRedirection('Your session has expired after 3 minutes. Please login again');
      return false;
    }

    return true;
  }

  public static handleAuthError(error: any): void {
    const errorMessage = error?.message?.toLowerCase() || '';

    if (errorMessage.includes('jwt expired')) {
      this.handleRedirection('Your session has expired. Please login again');
    } else if (errorMessage.includes('invalid token')) {
      this.handleRedirection('Invalid authentication. Please login again');
    } else if (errorMessage.includes('unauthorized')) {
      this.handleRedirection('Unauthorized access. Please login again');
    } else {
      this.handleRedirection('Authentication error. Please login again');
    }
  }

  public static forceLogout(message?: string): void {
    this.handleRedirection(message || 'You have been logged out');
  }

  public static storeToken(token: string): void {
    localStorage.setItem(this.STORAGE_KEYS.ACCESS_TOKEN, token);
  
    localStorage.setItem(this.STORAGE_KEYS.TOKEN_ISSUED_TIME, Math.floor(Date.now() / 1000).toString());
  }
}

export default TokenExpirationHandler;
