"use client"; // Error boundaries must be Client Components

// app/error.tsx
// Catches errors thrown while rendering this part of the app and shows a
// friendly message with a retry button instead of a broken page.
import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
  retry,
}: {
  error: Error & { digest?: string };
  reset: () => void;
  retry?: () => void;
}) {
  useEffect(() => {
    // Log it so it shows up in the browser console / an error reporter.
    console.error(error);
  }, [error]);

  return (
    <main className="container">
      <div className="status" role="alert">
        <h1 className="status-title">Something went wrong</h1>
        <p>Something went wrong loading this page.</p>
        <div className="status-actions">
          {/* Next.js 16 adds retry() (re-fetch and re-render); fall back to reset(). */}
          <button type="button" className="status-button" onClick={() => (retry ?? reset)()}>
            Try again
          </button>
          <Link href="/" className="back-link">
            ← Back to catalog
          </Link>
        </div>
      </div>
    </main>
  );
}
