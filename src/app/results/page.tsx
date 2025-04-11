// src/app/results/page.tsx
import { Suspense } from "react";
import ResultsClient from "./resultsClient";

export const dynamic = "force-dynamic"; 
// or "force-static", but "force-dynamic" is safer for user input

export default function ResultsPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ResultsClient />
    </Suspense>
  );
}
