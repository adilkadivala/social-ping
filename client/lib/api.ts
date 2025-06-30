const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    this.baseURL = API_BASE_URL;
    
    // Get token from localStorage on client side
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Auth methods
  async signUp(email: string, password: string, name: string) {
    const result = await this.request<{ token: string; user: any }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
    
    this.setToken(result.token);
    return result;
  }

  async signIn(email: string, password: string) {
    const result = await this.request<{ token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    this.setToken(result.token);
    return result;
  }

  async signOut() {
    await this.request('/auth/logout', { method: 'POST' });
    this.clearToken();
  }

  async getCurrentUser() {
    return this.request<any>('/auth/me');
  }

  // Keywords methods
  async getKeywords() {
    return this.request<any[]>('/keywords');
  }

  async addKeyword(keyword: string) {
    return this.request<any>('/keywords', {
      method: 'POST',
      body: JSON.stringify({ keyword }),
    });
  }

  async deleteKeyword(id: string) {
    return this.request<any>(`/keywords/${id}`, {
      method: 'DELETE',
    });
  }

  async toggleKeyword(id: string) {
    return this.request<any>(`/keywords/${id}/toggle`, {
      method: 'PATCH',
    });
  }

  // Mentions methods
  async getMentions(page: number = 1, limit: number = 20) {
    return this.request<{
      mentions: any[];
      pagination: { page: number; limit: number; total: number; pages: number };
    }>(`/mentions?page=${page}&limit=${limit}`);
  }

  async markMentionAsRead(id: string) {
    return this.request<any>(`/mentions/${id}/read`, {
      method: 'PATCH',
    });
  }

  async getMentionStats() {
    return this.request<{
      total: number;
      unread: number;
      twitter: number;
      reddit: number;
    }>('/mentions/stats');
  }

  // Token management
  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  getToken() {
    return this.token;
  }
}

export const apiClient = new ApiClient();