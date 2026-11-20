// app/loading.tsx
// Shown automatically while a route segment is loading, so visitors on a slow
// connection see a placeholder instead of a blank screen.
export default function Loading() {
  return (
    <main className="container">
      <div className="status" role="status" aria-live="polite">
        <span className="spinner" aria-hidden="true" />
        <p>Loading ShipYard…</p>
      </div>
    </main>
  );
}
