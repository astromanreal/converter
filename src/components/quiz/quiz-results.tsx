
'use client';

import React, { useState } from 'react';
import type { QuizResults, AttemptedQuestion } from '@/lib/quiz-types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, RotateCw, Eye, EyeOff, Info } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';


interface QuizResultsProps {
  results: QuizResults;
  onRestart: () => void;
}

export function QuizResultsCard({ results, onRestart }: QuizResultsProps) {
  const { score, totalQuestions, correctAnswers, incorrectAnswers, questionsAttempted } = results;
  const accuracy = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  const [showReview, setShowReview] = useState(false);

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

        <div className="flex flex-col sm:flex-row gap-2 justify-center mt-6">
            <Button onClick={onRestart}>
                <RotateCw className="mr-2 h-4 w-4" />
                Take Quiz Again
            </Button>
            {questionsAttempted && questionsAttempted.length > 0 && (
                 <Button variant="outline" onClick={() => setShowReview(!showReview)}>
                    {showReview ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
                    {showReview ? 'Hide Review' : 'Review Answers'}
                </Button>
            )}
        </div>
      </CardContent>

      {showReview && questionsAttempted && questionsAttempted.length > 0 && (
        <>
            <CardFooter className="flex-col items-start p-4 md:p-6 border-t">
                <h3 className="text-lg font-semibold mb-4 text-primary w-full text-center">Answers Review</h3>
                <ScrollArea className="h-[400px] w-full pr-3">
                <div className="space-y-4 ">
                    {questionsAttempted.map((attempt, index) => (
                    <Card key={attempt.question.id} className="overflow-hidden">
                        <CardHeader className="pb-3">
                        <div className="flex justify-between items-start gap-2">
                            <CardTitle className="text-base font-medium leading-tight">
                                {index + 1}. {attempt.question.question}
                            </CardTitle>
                            <Badge variant={
                                attempt.question.difficulty === 'Easy' ? 'default' :
                                attempt.question.difficulty === 'Medium' ? 'secondary' :
                                'destructive'
                                } className={cn(
                                    attempt.question.difficulty === 'Easy' && 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-300 dark:border-green-700',
                                    attempt.question.difficulty === 'Medium' && 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-yellow-300 dark:border-yellow-700',
                                    attempt.question.difficulty === 'Hard' && 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-300 dark:border-red-700',
                                    "whitespace-nowrap shrink-0"
                                )}>
                                {attempt.question.difficulty}
                            </Badge>
                        </div>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                        <p className="font-medium">Options:</p>
                        <ul className="space-y-1.5 pl-1">
                            {attempt.question.options.map((option, optIndex) => {
                            const isUserSelected = option === attempt.userAnswer;
                            const isCorrectAnswer = option === attempt.question.answer;
                            
                            return (
                                <li key={optIndex}
                                    className={cn(
                                    "flex items-center gap-2 p-2 border rounded-md",
                                    isUserSelected && attempt.isCorrect && "bg-green-100 dark:bg-green-900/50 border-green-500 dark:border-green-700 text-green-700 dark:text-green-300",
                                    isUserSelected && !attempt.isCorrect && "bg-red-100 dark:bg-red-900/50 border-red-500 dark:border-red-700 text-red-700 dark:text-red-300",
                                    !isUserSelected && isCorrectAnswer && "bg-blue-50 dark:bg-blue-900/30 border-blue-400 dark:border-blue-600 text-blue-700 dark:text-blue-300",
                                    !isUserSelected && !isCorrectAnswer && "bg-muted/30"
                                    )}
                                >
                                    {isUserSelected && attempt.isCorrect && <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />}
                                    {isUserSelected && !attempt.isCorrect && <XCircle className="h-4 w-4 text-red-500 shrink-0" />}
                                    {!isUserSelected && isCorrectAnswer && <Info className="h-4 w-4 text-blue-500 shrink-0" />}
                                    {!isUserSelected && !isCorrectAnswer && <span className="w-4 h-4 shrink-0"/>}
                                    <span className={cn(isCorrectAnswer && "font-semibold")}>{option}</span>
                                </li>
                            );
                            })}
                        </ul>
                        {!attempt.isCorrect && (
                            <Alert variant="default" className="bg-blue-50 dark:bg-blue-900/30 border-blue-400 dark:border-blue-600">
                                <Info className="h-4 w-4 text-blue-500" />
                                <AlertTitle className="text-blue-700 dark:text-blue-300">Correct Answer</AlertTitle>
                                <AlertDescription className="text-blue-600 dark:text-blue-400">
                                    {attempt.question.answer}
                                </AlertDescription>
                            </Alert>
                        )}
                        {attempt.question.explanation && (
                           <Alert variant={attempt.isCorrect ? "default" : "destructive"} className={cn(attempt.isCorrect && "bg-green-50 dark:bg-green-900/30 border-green-400 dark:border-green-600")}>
                               <Info className="h-4 w-4" />
                               <AlertTitle className={cn(attempt.isCorrect ? "text-green-700 dark:text-green-300" : "text-destructive")}>Explanation</AlertTitle>
                               <AlertDescription className={cn(attempt.isCorrect ? "text-green-600 dark:text-green-400" : "")}>
                                   {attempt.question.explanation}
                               </AlertDescription>
                           </Alert>
                        )}
                        </CardContent>
                    </Card>
                    ))}
                </div>
                </ScrollArea>
            </CardFooter>
        </>
      )}
    </Card>
  );
}
