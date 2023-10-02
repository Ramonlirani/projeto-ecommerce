import { Faq } from './faq.entity';

export class FaqCategory {
  id: string;
  name: string;
  faqs?: Faq[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
