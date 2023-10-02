export interface Faq {
  id: string;
  question: string;
  answer: string;
  active: boolean;

  faqCategoryId: string;
  createdAt: string;
  updatedAt: string;
}
