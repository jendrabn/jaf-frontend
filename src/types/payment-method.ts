export interface Bank {
  id: number;
  name: string;
  code: string;
  account_name: string;
  account_number: string;
  logo: string;
}

export interface Ewallet {
  id: number;
  name: string;
  // code: string;
  account_username: string;
  phone: string;
  logo: string;
}

export interface PaymentGateway {
  provider: string;
  client_key: string;
  fee: number; // flat fee in currency unit
}

