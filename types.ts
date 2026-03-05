
export type Category = 'Classic Coffee' | 'Winter Specials' | 'Tea & Others' | 'Desserts' | 'Cold Drinks';

export interface MenuItem {
  id: string;
  name: string;
  price?: number;
  category: Category;
  description: string;
  tags: string[];
}

export interface RecommendationRequest {
  mood: string;
  preference: string;
  energy: 'low' | 'medium' | 'high';
}

export interface RecommendationResponse {
  recommendation: string;
  selectedItems: string[];
  reasoning: string;
}

export interface QuizTopic {
  id: string;
  label: string;
  description: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}
