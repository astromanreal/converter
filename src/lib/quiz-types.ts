
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

export interface AttemptedQuestion {
  question: QuizQuestion;
  userAnswer: string;
  isCorrect: boolean;
}

export interface QuizResults {
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    incorrectAnswers: number;
    questionsAttempted: AttemptedQuestion[]; // Added for review
}
