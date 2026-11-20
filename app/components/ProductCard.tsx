// app/components/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";
import type { Product } from "../data/products";
import { asset } from "../lib/asset";

type ProductCardProps = {
  product: Product;
  // Cards in the first row are above the fold, so load them eagerly
  // (they are likely the Largest Contentful Paint). Everything else lazy-loads.
  eager?: boolean;
};

export default function ProductCard({ product, eager = false }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="card">
      {/* The accent color shows while the photo loads; width/height reserve
          the exact 4:3 box up front so nothing below it shifts (no CLS). */}
      <div className="card-art" style={{ background: product.accent }}>
        <Image
          src={asset(product.image)}
          alt={product.name}
          width={800}
          height={600}
          className="card-img"
          sizes="(max-width: 560px) 100vw, (max-width: 1040px) 50vw, 260px"
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
        />
      </div>
      <div className="card-body">
        <span className="card-category">{product.category}</span>
        <h2 className="card-name">{product.name}</h2>
        <p className="card-tagline">{product.tagline}</p>
        <span className="card-price">${product.price}</span>
      </div>
    </Link>
  );
}
