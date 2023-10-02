import { Faq } from "./Faq";

export interface FaqCategory {
  id: string;
  name: string;

  faqs: Faq[];
  createdAt: string;
  updatedAt: string;
}
