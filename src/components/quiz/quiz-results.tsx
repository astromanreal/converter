
'use client';

import React from 'react';
import type { QuizResults } from '@/lib/quiz-types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress'; // Import Progress component
import { CheckCircle, XCircle, RotateCw } from 'lucide-react'; // Icons for visual feedback

interface QuizResultsProps {
  results: QuizResults;
  onRestart: () => void;
}

export function QuizResultsCard({ results, onRestart }: QuizResultsProps) {
  const { score, totalQuestions, correctAnswers, incorrectAnswers } = results;
  const accuracy = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  let feedbackMessage = '';
  if (accuracy >= 90) {
    feedbackMessage = "Excellent work! You really know your conversions!";
  } else if (accuracy >= 70) {
    feedbackMessage = "Great job! You're getting the hang of it.";
  } else if (accuracy >= 50) {
    feedbackMessage = "Good effort! Keep practicing to improve.";
  } else {
    feedbackMessage = "Keep trying! Practice makes perfect.";
  }

  return (
    <Card className="w-full max-w-xl mx-auto shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-primary">Quiz Complete!</CardTitle>
        <CardDescription>{feedbackMessage}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 text-center">
        <div className="space-y-2">
          <p className="text-lg font-semibold">Your Score: {score} / {totalQuestions}</p>
          <Progress value={accuracy} className="w-3/4 mx-auto" aria-label={`Quiz score: ${accuracy}%`} />
          <p className="text-sm text-muted-foreground">{accuracy}% Accuracy</p>
        </div>

        <div className="flex justify-around items-center pt-4">
          <div className="flex flex-col items-center space-y-1">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <p className="text-lg font-medium">{correctAnswers}</p>
            <p className="text-sm text-muted-foreground">Correct</p>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <XCircle className="h-8 w-8 text-red-500" />
            <p className="text-lg font-medium">{incorrectAnswers}</p>
            <p className="text-sm text-muted-foreground">Incorrect</p>
          </div>
        </div>

        <Button onClick={onRestart} className="w-full sm:w-auto mt-6">
            <RotateCw className="mr-2 h-4 w-4" />
            Take Quiz Again
        </Button>
        {/* Optionally add link to review answers or go back home */}
        {/* <Button variant="outline" asChild className="w-full sm:w-auto mt-2">
            <Link href="/">Back to Home</Link>
        </Button> */}
      </CardContent>
    </Card>
  );
}
