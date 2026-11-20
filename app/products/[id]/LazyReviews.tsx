"use client";
// app/products/[id]/LazyReviews.tsx
// Client wrapper that code-splits the heavy Reviews panel with next/dynamic.
//
// Why a wrapper? `dynamic()` only creates a separate client chunk when it is
// called from a Client Component (and `ssr: false` is only allowed there).
// The product page is a Server Component, so it renders this wrapper instead.
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

function ReviewsSkeleton() {
  return (
    <section className="reviews reviews-loading" aria-busy="true">
      <p>Loading reviews…</p>
    </section>
  );
}

// Reviews ships in its own chunk, fetched only when it first renders.
// It is interactive and below the fold, so it does not need server rendering.
const Reviews = dynamic(() => import("./Reviews"), {
  ssr: false,
  loading: () => <ReviewsSkeleton />,
});

export default function LazyReviews({ productId }: { productId: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // Only start downloading the Reviews chunk when the shopper scrolls near it.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {inView ? <Reviews productId={productId} /> : <ReviewsSkeleton />}
    </div>
  );
}
