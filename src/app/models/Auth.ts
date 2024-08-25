import { User } from "./usuario";

export interface AuthResponse {
    access: string;
    refresh: string;
    user: User;
  }