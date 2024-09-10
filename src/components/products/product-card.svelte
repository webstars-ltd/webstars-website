<script lang="ts">
  import type { ProductContent } from "@lib/types";

  export let product: ProductContent;
  export let href: string;
  export let title: string;
  export let version: "one" | "two" = "one";

  const tagline = product.tagline ? `: ${product.tagline}` : "";
  const productTitle = product.list_title
    ? product.list_title
    : `${product.title ?? title}${tagline}`;
</script>

<a
  {href}
  class="
    insight-card
    h-[560px]
    block
    bg-brand-secondary-100
    text-brand-secondary-900
    pt-12
    pb-8

    hover:text-brand-secondary-900

    transition-all
    duration-300
    ease-linear

    has-card-hover-effect

    dark:text-brand-primary-900
  "
>
  <div class="flex flex-col gap-4 h-full">
    <p class="px-8 text-brand-black-700 dark:text-brand-primary-900">
      {product.product_type}
    </p>
    <h2
      class="heading-2 font-[500] px-8 leading-10 {version === 'one'
        ? 'text-brand-secondary-900 dark:text-brand-primary-900'
        : 'text-brand-primary-900'}"
    >
      {productTitle}
    </h2>
    <figure class="grow flex flex-col justify-end px-5">
      <img
        src={product.featured_image?.filename}
        alt={product.featured_image?.alt}
        class=""
      />
    </figure>
  </div>
</a>
