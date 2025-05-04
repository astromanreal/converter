
import Link from 'next/link';
import { Calculator, Settings, Contact, History, BrainCircuit, BookOpen } from 'lucide-react'; // Added BrainCircuit for Quiz, BookOpen for Learn
import { DarkModeToggle } from './dark-mode-toggle';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Added ml-2 for left spacing, mr-6 for right spacing */}
        <Link href="/" className="ml-2 mr-6 flex items-center space-x-2">
          <Calculator className="h-6 w-6 text-primary" />
          <span className="font-bold sm:inline-block">SmartConvert</span>
        </Link>
        {/* Navigation links could go here */}
        <div className="flex flex-1 items-center justify-end space-x-1 md:space-x-2"> {/* Adjusted spacing */}
            {/* Learn Icon Button */}
            <Button asChild variant="ghost" size="icon" aria-label="Learning Mode">
              <Link href="/learn">
                <BookOpen className="h-5 w-5" />
              </Link>
            </Button>
            {/* Quiz Icon Button */}
           <Button asChild variant="ghost" size="icon" aria-label="Quiz Mode">
             <Link href="/quiz">
               <BrainCircuit className="h-5 w-5" />
             </Link>
           </Button>
           {/* History Icon Button */}
           <Button asChild variant="ghost" size="icon" aria-label="History">
             <Link href="/history">
               <History className="h-5 w-5" />
             </Link>
           </Button>
           {/* Contact Icon Button */}
           <Button asChild variant="ghost" size="icon" aria-label="Contact">
             <Link href="/contact">
               <Contact className="h-5 w-5" />
             </Link>
           </Button>
           {/* Settings Icon Button */}
           <Button asChild variant="ghost" size="icon" aria-label="Settings">
            <Link href="/settings">
              <Settings className="h-5 w-5" />
            </Link>
           </Button>
          {/* Dark Mode Toggle */}
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}

