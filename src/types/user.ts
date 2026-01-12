export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  sex?: 1 | 2 | null;
  birth_date?: string | null;
  avatar: string;
}
