// app/products/[id]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products } from "../../data/products";
import { asset } from "../../lib/asset";
import LazyReviews from "./LazyReviews";

// In Next.js 15+, route params are passed as a Promise, so we await them.
type PageProps = {
  params: Promise<{ id: string }>;
};

// Pre-build one static page per product at build time.
export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

// Each product page gets its own title and description, built from the
// same typed data the page renders.
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const product = getProduct(params.id);
  if (!product) return { title: "Product not found | ShipYard" };

  return {
    title: `${product.name} | ShipYard`,
    description: product.tagline,
    openGraph: {
      title: `${product.name} | ShipYard`,
      description: product.tagline,
    },
  };
}

export default async function ProductPage(props: PageProps) {
  const params = await props.params;
  const product = getProduct(params.id);

  // If the id in the URL matches no product, show the 404 page.
  if (!product) {
    notFound();
  }

  return (
    <main className="container">
      <Link href="/" className="back-link">
        ← Back to catalog
      </Link>

      <article className="detail">
        <div className="detail-art" style={{ background: product.accent }}>
          {/* The main photo is the Largest Contentful Paint, so load it eagerly
              and preload it. (`preload` is Next.js 16's name for the old
              `priority` prop, which is now deprecated.) Only this image gets it. */}
          <Image
            src={asset(product.image)}
            alt={product.name}
            width={800}
            height={600}
            className="detail-img"
            sizes="(max-width: 760px) 100vw, 520px"
            preload
          />
        </div>
        <div className="detail-body">
          <span className="card-category">{product.category}</span>
          <h1 className="detail-name">{product.name}</h1>
          <p className="detail-tagline">{product.tagline}</p>
          <span className="detail-price">${product.price}</span>
          <p className="detail-desc">{product.description}</p>

          <h2 className="detail-specs-title">Specs</h2>
          <ul className="detail-specs">
            {product.specs.map((spec) => (
              <li key={spec}>{spec}</li>
            ))}
          </ul>
        </div>
      </article>

      {/* Heavy and below the fold: lazy-loaded with next/dynamic. */}
      <LazyReviews productId={product.id} />
    </main>
  );
}
