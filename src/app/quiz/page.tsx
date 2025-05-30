
'use client';

import React, { useState, useEffect } from 'react';
// import type { Metadata } from 'next'; // Metadata for client components is tricky. Define in layout or make page server component.
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BrainCircuit } from 'lucide-react';
import { QuizCard } from '@/components/quiz/quiz-card';
import { QuizResultsCard } from '@/components/quiz/quiz-results';
import { useQuiz } from '@/hooks/use-quiz';
import type { QuizQuestion, QuizDifficulty } from '@/lib/quiz-types';
import quizQuestionsData from '@/data/quiz-questions.json';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';

// It's better to handle metadata for client components in a parent server component (e.g., layout)
// or by converting this page to a server component if possible.
// For dynamic titles based on quiz state, it would require more advanced setup.
// Static metadata for the quiz landing:
// export const metadata: Metadata = {
//   title: 'Conversion Quiz Challenge - Test Your Unit Knowledge | SmartConvert',
//   description: 'Take the SmartConvert Conversion Quiz Challenge! Test your knowledge of unit conversions across various categories like length, weight, temperature, currency, and scientific units. Multiple difficulty levels available.',
//   keywords: ['conversion quiz', 'unit quiz', 'measurement challenge', 'test knowledge', 'online quiz', 'SmartConvert quiz', 'math quiz', 'science quiz'],
//   alternates: {
//     canonical: '/quiz',
//   },
//   openGraph: {
//     title: 'Conversion Quiz Challenge | SmartConvert',
//     description: 'Test your unit conversion skills with fun and challenging quizzes.',
//     url: '/quiz', // Will be resolved by metadataBase
//     type: 'website',
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: 'Conversion Quiz Challenge | SmartConvert',
//     description: 'Ready to test your conversion knowledge? Take the SmartConvert quiz!',
//   },
// };

export default function QuizPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [difficulty, setDifficulty] = useState<QuizDifficulty | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [allQuestions, setAllQuestions] = useState<QuizQuestion[]>([]);

  useEffect(() => {
      setIsLoading(true);
      setAllQuestions(quizQuestionsData as QuizQuestion[]);
      setIsLoading(false);
      setIsMounted(true);
  }, []);


  const {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    isQuizComplete,
    submitAnswer,
    nextQuestion,
    restartQuiz,
    getResults,
    userAnswer,
    isCorrect,
    feedbackMessage,
    selectedOption,
  } = useQuiz({ questions: allQuestions, difficulty });

  const handleDifficultyChange = (value: string) => {
      if (value === 'all') {
          setDifficulty(undefined);
      } else {
          setDifficulty(value as QuizDifficulty);
      }
  };

    const progress = totalQuestions > 0 ? ((currentQuestionIndex + (isQuizComplete ? 1 : 0)) / totalQuestions) * 100 : 0;

   if (!isMounted || isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-6">
         <Skeleton className="h-10 w-32" />
        <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-40" />
        </div>
         <Skeleton className="h-8 w-full" />
          <Skeleton className="h-[400px] w-full max-w-xl mx-auto" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <Button asChild variant="outline" className="mb-6">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
      </Button>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
             <h1 className="text-2xl font-bold text-primary flex items-center">
                <BrainCircuit className="mr-2 h-6 w-6"/> Conversion Quiz Challenge
            </h1>
            <div className="flex items-center gap-2">
                <Label htmlFor="difficulty-select" className="text-sm font-medium whitespace-nowrap">Select Difficulty:</Label>
                <Select
                    value={difficulty ?? 'all'}
                    onValueChange={handleDifficultyChange}
                    disabled={isQuizComplete || (currentQuestionIndex > 0 && totalQuestions > 0)}
                >
                    <SelectTrigger id="difficulty-select" className="w-[150px]">
                    <SelectValue placeholder="Select Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>

      {!isQuizComplete && currentQuestion && totalQuestions > 0 && (
           <div className="mb-6 space-y-2">
             <Progress value={progress} className="w-full" aria-label="Quiz progress" />
               <p className="text-sm text-muted-foreground text-center">
                 Question {currentQuestionIndex + 1} of {totalQuestions}
               </p>
           </div>
      )}

      {isQuizComplete ? (
        <QuizResultsCard results={getResults()} onRestart={restartQuiz} />
      ) : currentQuestion ? (
        <QuizCard
          key={currentQuestion.id}
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={totalQuestions}
          onSubmit={submitAnswer}
          onNext={nextQuestion}
          feedbackMessage={feedbackMessage}
          isCorrect={isCorrect}
          userAnswer={userAnswer}
          initialSelectedOption={selectedOption}
        />
       ) : (
           <div className="text-center text-muted-foreground py-10">
             {allQuestions.length > 0 ? "Select a difficulty to start the quiz." : "Loading questions..."}
           </div>
       )}

         <div className="mt-12 p-4 border border-dashed rounded-lg text-center text-muted-foreground bg-muted/20 max-w-4xl mx-auto">
             <p className="text-sm font-medium">Advertisement Placeholder</p>
             <p className="text-xs mt-1">Relevant ad content could be displayed here.</p>
         </div>
    </div>
  );
}
