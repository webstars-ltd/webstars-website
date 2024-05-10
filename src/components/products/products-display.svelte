<script lang="ts">
  import { onMount } from 'svelte';
  import type { Product } from '@lib/types';

  import ProductCard from './product-card.svelte';
  import LoadingSpinner from '@components/shared/loading-spinner.svelte';

  async function loadProducts() {
    loading = true;
    const url = ['/api/products'];
    const res = await fetch(url.join(''));

    if (res.ok) {
      const data = await res.json();
      loading = false;

      console.log('data', data);

      return data;
    } else {
      throw new Error('Error loading products');
    }
  }

  let loading: boolean = true;
  let products: Product[] = [];

  onMount(async () => {
    const productData = await loadProducts();

    products = productData?.products;
    loading = false;
  });
</script>

<div class="pt-10" id="projects-display-start">
  <section class="ws-container">
    {#if loading}
      <div class="py-20">
        <LoadingSpinner />
      </div>
    {/if}

    <div
      class="grid grid-cols-1 gap-5 gap-y-10 py-16 md:grid-cols-2 sm:gap-7 sm:gap-y-12 sm:mt-24"
    >
      {#each products as { content: product, slug, name }, i}
        <ProductCard
          {product}
          href={`/products/${slug}`}
          title={name ?? ''}
          version={i % 2 === 0 ? 'one' : 'two'}
        />
      {/each}
    </div>
  </section>
</div>
