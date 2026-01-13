export interface ValidationError {
  message: string;
  errors?: { [key: string]: string };
  status: number;
}

export interface Page {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

export interface NoContent {
  data: true;
}
