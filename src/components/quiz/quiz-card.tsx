
'use client';

import React, { useState, useEffect } from 'react';
import type { QuizQuestion } from '@/lib/quiz-types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

interface QuizCardProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  onSubmit: (selectedOption: string) => void;
  onNext: () => void;
  feedbackMessage: string | null;
  isCorrect: boolean | null;
  userAnswer: string | null; // The submitted answer
  initialSelectedOption?: string | null; // To potentially pre-select if reviewing
}

export function QuizCard({
  question,
  questionNumber,
  totalQuestions,
  onSubmit,
  onNext,
  feedbackMessage,
  isCorrect,
  userAnswer,
  initialSelectedOption = null,
}: QuizCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(initialSelectedOption);

  // Reset selection when question changes, unless an initial selection is provided (for review mode maybe)
  useEffect(() => {
      setSelectedOption(initialSelectedOption);
  }, [question, initialSelectedOption]);

  const handleSubmit = () => {
    if (selectedOption !== null) {
      onSubmit(selectedOption);
    }
  };

  const handleOptionChange = (value: string) => {
      if (userAnswer === null) { // Only allow changing selection if not submitted yet
        setSelectedOption(value);
      }
  };

  // Determine if the question has been answered
  const hasAnswered = userAnswer !== null;

  return (
    <Card className="w-full max-w-xl mx-auto shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <CardDescription>Question {questionNumber} of {totalQuestions}</CardDescription>
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
              question.difficulty === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
              question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
            {question.difficulty}
          </span>
        </div>
        <CardTitle className="text-lg font-semibold">{question.question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup
            value={selectedOption ?? undefined} // Use selectedOption for controlled component
            onValueChange={handleOptionChange}
            className="space-y-3"
            disabled={hasAnswered} // Disable after answering
          >
           {question.options.map((option, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center space-x-3 rounded-md border p-3 transition-colors",
                hasAnswered && option === question.answer && "border-green-500 bg-green-50 dark:bg-green-900/30", // Highlight correct answer
                hasAnswered && option === userAnswer && option !== question.answer && "border-red-500 bg-red-50 dark:bg-red-900/30", // Highlight incorrect user choice
                !hasAnswered && selectedOption === option && "border-primary bg-muted/50", // Highlight selection before submit
                 hasAnswered ? "cursor-not-allowed opacity-70" : "cursor-pointer hover:bg-muted/30"
              )}
              // Optional: Click anywhere on the div to select the radio
               onClick={() => !hasAnswered && handleOptionChange(option)}
            >
              <RadioGroupItem value={option} id={`option-${index}`} disabled={hasAnswered} />
              <Label htmlFor={`option-${index}`} className={cn("flex-1", hasAnswered ? "cursor-not-allowed" : "cursor-pointer")}>
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>

        {feedbackMessage && (
          <Alert variant={isCorrect ? 'default' : 'destructive'} className={isCorrect ? "border-green-500" : ""}>
            <AlertTitle>{isCorrect ? 'Correct!' : 'Incorrect'}</AlertTitle>
            <AlertDescription>{feedbackMessage}</AlertDescription>
          </Alert>
        )}

         {/* Show Submit button only if not answered, Next button only if answered */}
        {!hasAnswered ? (
          <Button
            onClick={handleSubmit}
            disabled={selectedOption === null || hasAnswered}
            className="w-full"
          >
            Submit Answer
          </Button>
        ) : (
           <Button onClick={onNext} className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80">
            {questionNumber === totalQuestions ? 'Finish Quiz' : 'Next Question'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

