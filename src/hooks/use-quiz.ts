
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { QuizQuestion, QuizResults, QuizDifficulty } from '@/lib/quiz-types';

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
}

export function useQuiz({ questions, difficulty }: UseQuizOptions): UseQuizReturn {
  const [filteredQuestions, setFilteredQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [userAnswer, setUserAnswer] = useState<string | null>(null); // Track the submitted answer
  const [selectedOption, setSelectedOption] = useState<string | null>(null); // Track the selected radio button
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Filter and shuffle questions on initial load or when difficulty changes
  useEffect(() => {
    let availableQuestions = questions;
    if (difficulty) {
      availableQuestions = questions.filter(q => q.difficulty === difficulty);
    }
    // Simple shuffle (Fisher-Yates algorithm)
    const shuffled = [...availableQuestions].sort(() => Math.random() - 0.5);
    setFilteredQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsQuizComplete(false);
    setUserAnswer(null);
    setSelectedOption(null);
    setIsCorrect(null);
    setFeedbackMessage(null);
  }, [questions, difficulty]); // Depend on questions and difficulty

  const currentQuestion = filteredQuestions[currentQuestionIndex] || null;
  const totalQuestions = filteredQuestions.length;

  const submitAnswer = useCallback((selected: string) => {
    if (userAnswer !== null || !currentQuestion) return; // Prevent submitting multiple times or if no question

    setUserAnswer(selected);
    setSelectedOption(selected); // Keep track of the selected option visually
    const correctAnswer = currentQuestion.answer;
    const correct = selected === correctAnswer;

    setIsCorrect(correct);
    if (correct) {
      setScore((prevScore) => prevScore + 1);
      setFeedbackMessage("Correct!");
    } else {
      setFeedbackMessage(`Incorrect. The correct answer is: ${correctAnswer}. ${currentQuestion.explanation || ''}`);
    }
  }, [currentQuestion, userAnswer]);

  const nextQuestion = useCallback(() => {
    // Reset feedback for the next question
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
    // Re-shuffle questions for a new attempt
    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
    setFilteredQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsQuizComplete(false);
    setUserAnswer(null);
    setSelectedOption(null);
    setIsCorrect(null);
    setFeedbackMessage(null);
  }, [filteredQuestions]); // Depend on filteredQuestions to reshuffle them

  const getResults = useCallback((): QuizResults => {
    return {
      score: score,
      totalQuestions: totalQuestions,
      correctAnswers: score,
      incorrectAnswers: totalQuestions - score,
    };
  }, [score, totalQuestions]);

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
    userAnswer, // The answer submitted by the user
    isCorrect,
    feedbackMessage,
    selectedOption // The option currently selected (before submitting)
  };
}
