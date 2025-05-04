
'use client'; // This page manages interactive quiz state

import React, { useState, useEffect } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BrainCircuit } from 'lucide-react'; // Using BrainCircuit for Quiz icon
import { QuizCard } from '@/components/quiz/quiz-card';
import { QuizResultsCard } from '@/components/quiz/quiz-results';
import { useQuiz } from '@/hooks/use-quiz';
import type { QuizQuestion, QuizDifficulty } from '@/lib/quiz-types';
import quizQuestionsData from '@/data/quiz-questions.json'; // Import the questions
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton'; // For loading state


// Metadata can remain static for the main quiz page route
// export const metadata: Metadata = {
//   title: 'Conversion Quiz Challenge',
//   description: 'Test your knowledge of unit conversions with our interactive quiz!',
//   alternates: {
//     canonical: '/quiz',
//   },
// };
// Note: Since this is a Client Component due to state management,
// metadata should ideally be handled in a parent Layout or Page Server Component if needed.
// For simplicity here, we'll omit dynamic metadata generation based on quiz state.

export default function QuizPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [difficulty, setDifficulty] = useState<QuizDifficulty | undefined>(undefined); // Start with all questions
  const [isLoading, setIsLoading] = useState(true); // Control loading state

  // Load questions (ensure this runs client-side)
  const [allQuestions, setAllQuestions] = useState<QuizQuestion[]>([]);

  useEffect(() => {
      // Simulate loading if needed, or directly set questions if static import is fast
      setIsLoading(true);
      setAllQuestions(quizQuestionsData as QuizQuestion[]); // Cast if needed
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
    selectedOption, // Get selectedOption from hook
  } = useQuiz({ questions: allQuestions, difficulty });

  const handleDifficultyChange = (value: string) => {
      if (value === 'all') {
          setDifficulty(undefined);
      } else {
          setDifficulty(value as QuizDifficulty);
      }
      // useQuiz hook useEffect will handle restarting/refiltering
  };

    // Calculate progress percentage
    const progress = totalQuestions > 0 ? ((currentQuestionIndex + (isQuizComplete ? 1 : 0)) / totalQuestions) * 100 : 0;


   if (!isMounted || isLoading) {
    // Show skeleton loaders while mounting or loading questions
    return (
      <div className="container mx-auto px-4 py-8 space-y-6">
         <Skeleton className="h-10 w-32" /> {/* Back button */}
        <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-48" /> {/* Title */}
            <Skeleton className="h-10 w-40" /> {/* Difficulty Selector */}
        </div>
         <Skeleton className="h-8 w-full" /> {/* Progress Bar */}
          <Skeleton className="h-[400px] w-full max-w-xl mx-auto" /> {/* Quiz Card Skeleton */}
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
                    disabled={isQuizComplete || currentQuestionIndex > 0} // Disable after starting
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
          key={currentQuestion.id} // Add key for re-rendering on question change
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={totalQuestions}
          onSubmit={submitAnswer}
          onNext={nextQuestion}
          feedbackMessage={feedbackMessage}
          isCorrect={isCorrect}
          userAnswer={userAnswer}
          initialSelectedOption={selectedOption} // Pass selected option state
        />
       ) : (
           <div className="text-center text-muted-foreground py-10">
             {allQuestions.length > 0 ? "Select a difficulty to start the quiz." : "Loading questions..."}
             {/* Add a button to explicitly start if needed */}
             {/* <Button onClick={restartQuiz} disabled={!difficulty}>Start Quiz</Button> */}
           </div>
       )}

        {/* Ad Placeholder Section */}
        {/* <Separator className="my-8" /> */}
         <div className="mt-12 p-4 border border-dashed rounded-lg text-center text-muted-foreground bg-muted/20 max-w-4xl mx-auto">
             <p className="text-sm font-medium">Advertisement Placeholder</p>
             <p className="text-xs mt-1">Relevant ad content could be displayed here.</p>
         </div>

    </div>
  );
}

