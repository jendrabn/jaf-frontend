export interface Banner {
  id: number;
  image: string;
  image_description: string;
  url: string;
}

export interface NewsletterResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    email: string;
    name: string;
    status: string;
    subscribed_at: string;
    unsubscribed_at: string | null;
    created_at: string;
    updated_at: string;
  };
}

