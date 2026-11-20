"use client";
// app/products/[id]/Reviews.tsx
// A heavy, interactive, below-the-fold panel: rating chart, star filters,
// sorting, and a long review list. It is lazy-loaded by LazyReviews.tsx so
// none of this code (or the review data) is in the page's first load.
import { useMemo, useState } from "react";
import { getReviews, type Review } from "../../data/reviews";

type SortKey = "helpful" | "newest" | "highest" | "lowest";

const sorters: Record<SortKey, (a: Review, b: Review) => number> = {
  helpful: (a, b) => b.helpful - a.helpful,
  newest: (a, b) => b.date.localeCompare(a.date),
  highest: (a, b) => b.rating - a.rating || b.helpful - a.helpful,
  lowest: (a, b) => a.rating - b.rating || b.helpful - a.helpful,
};

const PAGE_SIZE = 5;

function Stars({ value }: { value: number }) {
  return (
    <span className="stars" aria-label={`${value.toFixed(1)} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={n <= Math.round(value) ? "star on" : "star"}>
          ★
        </span>
      ))}
    </span>
  );
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function Reviews({ productId }: { productId: string }) {
  const all = useMemo(() => getReviews(productId), [productId]);
  const [stars, setStars] = useState<number | null>(null);
  const [sort, setSort] = useState<SortKey>("helpful");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const counts = useMemo(() => {
    const c = [0, 0, 0, 0, 0];
    all.forEach((r) => c[r.rating - 1]++);
    return c;
  }, [all]);

  const average = all.length
    ? all.reduce((sum, r) => sum + r.rating, 0) / all.length
    : 0;

  const shown = useMemo(
    () =>
      all
        .filter((r) => stars === null || r.rating === stars)
        .sort(sorters[sort]),
    [all, stars, sort],
  );

  const maxCount = Math.max(...counts, 1);

  function filterBy(n: number | null) {
    setStars(n);
    setVisible(PAGE_SIZE);
  }

  return (
    <section className="reviews" aria-labelledby="reviews-title">
      <h2 id="reviews-title" className="reviews-title">
        Customer reviews
      </h2>

      <div className="reviews-summary">
        <div className="reviews-score">
          <span className="reviews-average">{average.toFixed(1)}</span>
          <Stars value={average} />
          <span className="reviews-total">{all.length} reviews</span>
        </div>

        {/* Rating distribution: click a bar to filter by that star rating. */}
        <svg
          className="reviews-chart"
          viewBox="0 0 280 130"
          role="img"
          aria-label="Rating distribution"
        >
          {[5, 4, 3, 2, 1].map((n, row) => {
            const count = counts[n - 1];
            const width = (count / maxCount) * 200;
            const y = row * 26;
            const active = stars === null || stars === n;
            return (
              <g
                key={n}
                className="reviews-bar"
                onClick={() => filterBy(stars === n ? null : n)}
              >
                <text x="0" y={y + 15} className="reviews-bar-label">
                  {n}★
                </text>
                <rect x="34" y={y + 4} width="200" height="14" rx="7" className="reviews-bar-track" />
                <rect
                  x="34"
                  y={y + 4}
                  width={Math.max(width, count ? 14 : 0)}
                  height="14"
                  rx="7"
                  className="reviews-bar-fill"
                  opacity={active ? 1 : 0.35}
                />
                <text x="246" y={y + 15} className="reviews-bar-count">
                  {count}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="reviews-controls">
        <div className="reviews-filters" role="group" aria-label="Filter by rating">
          {[null, 5, 4, 3, 2, 1].map((n) => (
            <button
              key={n ?? "all"}
              type="button"
              className={stars === n ? "chip chip-active" : "chip"}
              aria-pressed={stars === n}
              onClick={() => filterBy(n)}
            >
              {n === null ? "All" : `${n}★`}
            </button>
          ))}
        </div>
        <label className="reviews-sort">
          Sort by{" "}
          <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
            <option value="helpful">Most helpful</option>
            <option value="newest">Newest</option>
            <option value="highest">Highest rating</option>
            <option value="lowest">Lowest rating</option>
          </select>
        </label>
      </div>

      {shown.length === 0 ? (
        <p className="reviews-empty">No reviews with this rating yet.</p>
      ) : (
        <ul className="reviews-list">
          {shown.slice(0, visible).map((review) => (
            <li key={review.id} className="review">
              <div className="review-head">
                <Stars value={review.rating} />
                <strong className="review-title">{review.title}</strong>
              </div>
              <p className="review-body">{review.body}</p>
              <p className="review-meta">
                {review.author} · {formatDate(review.date)}
                {review.verified && " · Verified purchase"} · {review.helpful} found this helpful
              </p>
            </li>
          ))}
        </ul>
      )}

      {visible < shown.length && (
        <button
          type="button"
          className="reviews-more"
          onClick={() => setVisible((v) => v + PAGE_SIZE)}
        >
          Show more reviews ({shown.length - visible} left)
        </button>
      )}
    </section>
  );
}
