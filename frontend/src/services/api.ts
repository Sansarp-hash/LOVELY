import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class APIClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add token to requests
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Handle responses
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expired, redirect to login
          localStorage.removeItem('accessToken');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async register(data: any) {
    return this.client.post('/auth/register', data);
  }

  async login(email: string, password: string) {
    return this.client.post('/auth/login', { email, password });
  }

  async verifyEmail(token: string) {
    return this.client.post('/auth/verify-email', { token });
  }

  async getCurrentUser() {
    return this.client.get('/auth/me');
  }

  // Media endpoints
  async getMedia(params?: any) {
    return this.client.get('/media', { params });
  }

  async getMediaById(id: string) {
    return this.client.get(`/media/${id}`);
  }

  async createMedia(data: any) {
    return this.client.post('/media', data);
  }

  async rateMedia(id: string, rating: number, review?: string) {
    return this.client.post(`/media/${id}/rate`, { rating, review });
  }

  // User endpoints
  async getUserProfile(id: string) {
    return this.client.get(`/users/${id}`);
  }

  async updateUserProfile(id: string, data: any) {
    return this.client.put(`/users/${id}`, data);
  }

  async getWatchlist() {
    return this.client.get('/users/watchlist');
  }

  async addToWatchlist(contentId: string, status: string) {
    return this.client.post('/users/watchlist', { contentId, status });
  }

  // Coin endpoints
  async getCoinBalance() {
    return this.client.get('/coins/balance');
  }

  async purchaseCoins(packageId: string, paymentMethodId: string) {
    return this.client.post('/coins/purchase', { packageId, paymentMethodId });
  }

  async getCoinTransactions() {
    return this.client.get('/coins/transactions');
  }

  // Subscription endpoints
  async getSubscriptionPlans() {
    return this.client.get('/subscriptions/plans');
  }

  async createSubscription(planId: string, paymentMethodId: string) {
    return this.client.post('/subscriptions/create', { planId, paymentMethodId });
  }

  // Raffle endpoints
  async getRaffles(params?: any) {
    return this.client.get('/raffles', { params });
  }

  async enterRaffle(raffleId: string, entries: number) {
    return this.client.post(`/raffles/${raffleId}/enter`, { entries });
  }

  async getRaffleStatus(raffleId: string) {
    return this.client.get(`/raffles/${raffleId}/status`);
  }

  // Live stream endpoints
  async getLiveStreams() {
    return this.client.get('/live');
  }

  async sendGift(streamId: string, giftId: string, quantity: number) {
    return this.client.post(`/live/${streamId}/gift`, { giftId, quantity });
  }
}

export default new APIClient();
