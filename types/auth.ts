export interface KidProfile {
  id: string;
  name: string;
  avatar: string;
  themeColor: string;
  ageGroup: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  pin?: string;
  isPremium?: boolean;
  createdAt: string;
  kidProfiles?: KidProfile[];
  activeKidId?: string | null;
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
