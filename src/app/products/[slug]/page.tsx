import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { initialProducts } from "@/data/initialData";
import ProductDetailClient from "./ProductDetailClient";
import JsonLd from "@/components/JsonLd";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return initialProducts.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = initialProducts.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} in Kurnool | AAHAR HOME FOODS`,
    description: `${product.description} Available for store pickup on Road No. 3, Venkataramana Colony, Kurnool, Andhra Pradesh 518001 or WhatsApp order. Price: ₹${product.price} / ${product.unit}.`,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | AAHAR HOME FOODS Kurnool`,
      description: product.description,
      images: [
        {
          url: product.image,
          alt: `${product.name} - AAHAR HOME FOODS`,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = initialProducts.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const productJsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: `https://www.aaharhomefoods.com${product.image}`,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: "AAHAR HOME FOODS",
    },
    offers: {
      "@type": "Offer",
      url: `https://www.aaharhomefoods.com/products/${product.slug}`,
      priceCurrency: "INR",
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "AAHAR HOME FOODS Kurnool",
      },
    },
  };

  return (
    <>
      <JsonLd data={productJsonLd} />
      <ProductDetailClient product={product} />
    </>
  );
}
