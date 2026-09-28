export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  pin?: string;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  pin?: string;
  avatar?: string;
}

