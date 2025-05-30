
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { QuizQuestion, QuizResults, QuizDifficulty, AttemptedQuestion } from '@/lib/quiz-types';

interface UseQuizOptions {
  questions: QuizQuestion[];
  difficulty?: QuizDifficulty; // Optional: Filter questions by difficulty
}

interface UseQuizReturn {
  currentQuestion: QuizQuestion | null;
  currentQuestionIndex: number;
  totalQuestions: number;
  score: number;
  isQuizComplete: boolean;
  submitAnswer: (selectedOption: string) => void;
  nextQuestion: () => void;
  restartQuiz: () => void;
  getResults: () => QuizResults;
  userAnswer: string | null;
  isCorrect: boolean | null;
  feedbackMessage: string | null;
  selectedOption: string | null; // Track which option the user selected
  // questionsAttempted is not directly returned, but included in getResults()
}

export function useQuiz({ questions, difficulty }: UseQuizOptions): UseQuizReturn {
  const [filteredQuestions, setFilteredQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [questionsAttempted, setQuestionsAttempted] = useState<AttemptedQuestion[]>([]);

  useEffect(() => {
    let availableQuestions = questions;
    if (difficulty) {
      availableQuestions = questions.filter(q => q.difficulty === difficulty);
    }
    const shuffled = [...availableQuestions].sort(() => Math.random() - 0.5);
    setFilteredQuestions(shuffled);
    // Reset state when questions/difficulty change
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsQuizComplete(false);
    setUserAnswer(null);
    setSelectedOption(null);
    setIsCorrect(null);
    setFeedbackMessage(null);
    setQuestionsAttempted([]);
  }, [questions, difficulty]);

  const currentQuestion = filteredQuestions[currentQuestionIndex] || null;
  const totalQuestions = filteredQuestions.length;

  const submitAnswer = useCallback((selected: string) => {
    if (userAnswer !== null || !currentQuestion) return;

    setUserAnswer(selected);
    setSelectedOption(selected);
    const correctAnswer = currentQuestion.answer;
    const correct = selected === correctAnswer;

    setIsCorrect(correct);
    if (correct) {
      setScore((prevScore) => prevScore + 1);
      setFeedbackMessage("Correct!");
    } else {
      setFeedbackMessage(`Incorrect. The correct answer is: ${correctAnswer}. ${currentQuestion.explanation || ''}`);
    }

    const attempt: AttemptedQuestion = {
      question: currentQuestion,
      userAnswer: selected,
      isCorrect: correct,
    };
    setQuestionsAttempted((prev) => [...prev, attempt]);

  }, [currentQuestion, userAnswer]);

  const nextQuestion = useCallback(() => {
    setUserAnswer(null);
    setSelectedOption(null);
    setIsCorrect(null);
    setFeedbackMessage(null);

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsQuizComplete(true);
    }
  }, [currentQuestionIndex, totalQuestions]);

  const restartQuiz = useCallback(() => {
    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
    setFilteredQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsQuizComplete(false);
    setUserAnswer(null);
    setSelectedOption(null);
    setIsCorrect(null);
    setFeedbackMessage(null);
    setQuestionsAttempted([]); // Clear attempted questions on restart
  }, [filteredQuestions]);

  const getResults = useCallback((): QuizResults => {
    return {
      score: score,
      totalQuestions: totalQuestions,
      correctAnswers: score,
      incorrectAnswers: totalQuestions - score,
      questionsAttempted: questionsAttempted, // Include attempted questions in results
    };
  }, [score, totalQuestions, questionsAttempted]);

  return {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    score,
    isQuizComplete,
    submitAnswer,
    nextQuestion,
    restartQuiz,
    getResults,
    userAnswer,
    isCorrect,
    feedbackMessage,
    selectedOption
  };
}
