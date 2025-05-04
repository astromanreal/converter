import { redirect } from 'next/navigation';

// Redirect users from the base /converters path back to the homepage
// as converters are accessed via /converters/[converterType]
export default function ConvertersPage() {
  redirect('/');
}
