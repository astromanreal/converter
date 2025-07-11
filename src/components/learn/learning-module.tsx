
'use client';

import React from 'react';
import type { LearningModule } from '@/data/learning-content';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react'; // For fun facts

interface LearningModuleCardProps {
  module: LearningModule;
}

export function LearningModuleCard({ module }: LearningModuleCardProps) {
  return (
    <Card className="flex flex-col h-full shadow-md hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="text-xl text-primary">{module.title}</CardTitle>
        {module.system && (
            <Badge variant="secondary" className="w-fit mt-1">{module.system}</Badge>
        )}
        <CardDescription className="pt-2">{module.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <Accordion type="single" collapsible className="w-full">
          {/* Key Units Section */}
          {module.key_units && module.key_units.length > 0 && (
            <AccordionItem value="key-units">
              <AccordionTrigger className="text-base font-medium">Key Units</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside space-y-1 text-sm ml-2">
                  {module.key_units.map((unit, index) => (
                    <li key={index}>{unit}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          )}

          {/* Conversion Examples Section */}
          {module.conversion_examples && module.conversion_examples.length > 0 && (
            <AccordionItem value="examples">
              <AccordionTrigger className="text-base font-medium">Examples</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 text-sm ml-2">
                  {module.conversion_examples.map((example, index) => (
                    <li key={index} className="flex items-center">
                      <span>{example.from}</span>
                      <span className="mx-2 font-semibold text-primary">→</span>
                      <span>{example.to}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          )}

          {/* Fun Fact Section */}
          {module.fun_fact && (
            <AccordionItem value="fun-fact">
              <AccordionTrigger className="text-base font-medium">
                <span className="flex items-center">
                    <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" /> Fun Fact
                </span>
                </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm italic text-muted-foreground">{module.fun_fact}</p>
              </AccordionContent>
            </AccordionItem>
          )}

        </Accordion>
      </CardContent>
      {/* Footer for actions like 'Mark as Learned' (optional) */}
       <CardFooter>
         {/* <Button size="sm" variant="outline" className="w-full">Mark as Learned</Button> */}
         {/* Placeholder - Add functionality later if needed */}
       </CardFooter>
    </Card>
  );
}
