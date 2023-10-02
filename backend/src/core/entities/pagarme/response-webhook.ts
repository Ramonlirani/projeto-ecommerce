export interface ResponseWebhook {
  id: string;
  account: Account;
  type: string;
  created_at: string;
  data: Data;
}

interface Account {
  id: string;
  name: string;
}

interface Data {
  id: string;
  code: string;
  amount: number;
  currency: string;
  closed: boolean;
  items: Item[];
  customer: Customer;
  status: string;
  created_at: string;
  updated_at: string;
  closed_at: string;
  charges: Charge[];
  checkouts: any[];
}

interface Item {
  id: string;
  type: string;
  description: string;
  amount: number;
  quantity: number;
  status: string;
  created_at: string;
  updated_at: string;
  code: string;
}

interface Address {
  id: string;
  line_1: string;
  zip_code: string;
  city: string;
  state: string;
  country: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface Phones {
  mobile_phone: MobilePhone;
}

interface MobilePhone {
  country_code: string;
  number: string;
  area_code: string;
}

interface Charge {
  id: string;
  code: string;
  gateway_id: string;
  amount: number;
  paid_amount: number;
  status: string;
  currency: string;
  payment_method: string;
  paid_at: string;
  created_at: string;
  updated_at: string;
  customer: Customer;
  last_transaction: LastTransaction;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  document: string;
  document_type: string;
  type: string;
  delinquent: boolean;
  address: Address;
  created_at: string;
  updated_at: string;
  phones: Phones;
}

interface LastTransaction {
  id: string;
  transaction_type: string;
  gateway_id: string;
  amount: number;
  status: string;
  success: boolean;
  installments: number;
  statement_descriptor: string;
  acquirer_name: string;
  acquirer_tid: string;
  acquirer_nsu: string;
  acquirer_auth_code: string;
  acquirer_message: string;
  acquirer_return_code: string;
  operation_type: string;
  card: Card;
  funding_source: string;
  created_at: string;
  updated_at: string;
  gateway_response: GatewayResponse;
  antifraud_response: AntifraudResponse;
}

interface Card {
  id: string;
  first_six_digits: string;
  last_four_digits: string;
  brand: string;
  holder_name: string;
  exp_month: number;
  exp_year: number;
  status: string;
  type: string;
  created_at: string;
  updated_at: string;
  billing_address: BillingAddress;
}

interface BillingAddress {
  street: string;
  number: string;
  zip_code: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  line_1: string;
}

interface GatewayResponse {
  code: string;
  errors: any[];
}

interface AntifraudResponse {
  status: string;
  score: string;
  provider_name: string;
}
