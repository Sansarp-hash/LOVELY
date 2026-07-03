// Re-export backend types as needed
export interface User {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  role: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}
