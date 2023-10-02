export interface CardToken {
  id: string;
  type: string;
  created_at: string;
  expires_at: string;
  card: Card;
}

interface Card {
  first_six_digits: string;
  last_four_digits: string;
  holder_name: string;
  exp_month: number;
  exp_year: number;
  brand: string;
  label: string;
}
