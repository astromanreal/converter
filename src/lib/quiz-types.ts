
export type QuizDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface QuizQuestion {
  id: string; // Added unique ID
  category: string; // e.g., 'Length', 'Weight', 'Chemistry'
  question: string;
  options: string[];
  answer: string; // Should exactly match one of the options
  difficulty: QuizDifficulty;
  explanation?: string; // Optional explanation for the answer
}

export interface QuizResults {
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    incorrectAnswers: number;
    // Could add time taken, accuracy percentage, etc. later
}
