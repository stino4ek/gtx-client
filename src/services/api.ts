const API_BASE_URL = import.meta.env.VITE_API_URL;

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = localStorage.getItem('accessToken');

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data: ApiResponse<T> = await response.json();

      if (!response.ok) {
        // Handle 401 errors by attempting token refresh
        if (response.status === 401 && token) {
          try {
            await this.refreshToken();
            // Retry the original request with new token
            const newToken = localStorage.getItem('accessToken');
            if (newToken) {
              config.headers = {
                ...config.headers,
                Authorization: `Bearer ${newToken}`,
              };
              const retryResponse = await fetch(url, config);
              const retryData: ApiResponse<T> = await retryResponse.json();
              
              if (!retryResponse.ok) {
                throw new Error(retryData.error || retryData.message || 'Request failed');
              }
              
              return retryData.data!;
            }
          } catch (refreshError) {
            // Refresh failed, clear tokens and redirect to login
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
            throw new Error('Session expired. Please login again.');
          }
        }

        throw new Error(data.error || data.message || 'Request failed');
      }

      if (!data.success) {
        throw new Error(data.error || data.message || 'Request failed');
      }

      return data.data!;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error occurred');
    }
  }

  // Auth endpoints
  async login(email: string, password: string, rememberMe = false) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, rememberMe }),
    });
  }

  async register(userData: any) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout() {
    try {
      await this.request('/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Logout API error:', error);
    }
  }

  async refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    return this.request('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  }

  async getProfile() {
    return this.request('/auth/profile', {
      method: 'GET',
    });
  }

  // External API endpoints (for sports data)
  async getSports(dataType: 'live' | 'line', dataLang: string) {
    return this.request(`/sports/${dataType}/${dataLang}`, {
      method: 'GET',
      headers: {
        'Package': 'daeyae9us9IphohTh4AiFeex4l',
      },
    });
  }

  async getCountries(sportId: string, dataType: 'live' | 'line', dataLang: string) {
    return this.request(`/countries/${sportId}/${dataType}/${dataLang}`, {
      method: 'GET',
      headers: {
        'Package': 'daeyae9us9IphohTh4AiFeex4l',
      },
    });
  }

  async getTournaments(sportId: string, countryId: string, dataType: 'live' | 'line', dataLang: string) {
    return this.request(`/tournaments/${sportId}/${countryId}/${dataType}/${dataLang}`, {
      method: 'GET',
      headers: {
        'Package': 'daeyae9us9IphohTh4AiFeex4l',
      },
    });
  }

  async getEvents(sportId: string, tournamentId: string, listType: 'sub' | 'list', pageLength: number, dataType: 'live' | 'line', dataLang: string) {
    return this.request(`/events/${sportId}/${tournamentId}/${listType}/${pageLength}/${dataType}/${dataLang}`, {
      method: 'GET',
      headers: {
        'Package': 'daeyae9us9IphohTh4AiFeex4l',
      },
    });
  }

  async getEvent(gameId: string, listType: 'sub' | 'list', dataType: 'live' | 'line', dataLang: string) {
    return this.request(`/event/${gameId}/${listType}/${dataType}/${dataLang}`, {
      method: 'GET',
      headers: {
        'Package': 'daeyae9us9IphohTh4AiFeex4l',
      },
    });
  }
}

export const apiService = new ApiService();
