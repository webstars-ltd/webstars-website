<script lang="ts">
  import { onMount } from 'svelte';
  import type { Insight, SbDatasourceEntry } from '@lib/types';

  import InsightCard from './insight-card.svelte';
  import LoadingSpinner from '@components/shared/loading-spinner.svelte';

  async function loadInsightCategories() {
    loading = true;
    const url = ['/api/insight-categories'];
    const res = await fetch(url.join(''));

    if (res.ok) {
      const data = await res.json();
      loading = false;
      return data;
    } else {
      throw new Error('Error loading insights');
    }
  }

  async function loadInsights() {
    loading = true;
    const url = ['/api/insights'];
    const res = await fetch(url.join(''));

    if (res.ok) {
      const data = await res.json();
      loading = false;
      return data;
    } else {
      throw new Error('Error loading insights');
    }
  }

  let loading: boolean = true;
  let categories: SbDatasourceEntry[] = [];
  let allInsights: Insight[] = [];
  let filteredInsights: Insight[] = [];
  let selectedCategory: string | null = '';

  const handleFilterInsights = (category: string) => {
    if (selectedCategory === category) {
      selectedCategory = null;
      filteredInsights = allInsights;
      return;
    }
    // Filter the insights by selected category
    selectedCategory = category;
    filteredInsights = allInsights.filter((i) =>
      i.content.categories.includes(category)
    );
  };

  onMount(async () => {
    const insightsData = await loadInsights();
    categories = await loadInsightCategories();
    allInsights = insightsData?.insights;
    filteredInsights = allInsights;

    loading = false;
  });
</script>

<div class="pt-10" id="listings-display-start">
  <div class="ws-container">
    <h1 class="heading-2 font-sans mb-4 font-semibold">Insight Categories</h1>
    <div class="flex flex-row gap-4 flex-wrap">
      {#each categories as category}
        <button
          class="
          bg-brand-gray-100
            font-sans
            font-semibold
            px-5
            py-2
            
            hover:bg-brand-primary-300
            hover:text-white

            data-[active=true]:bg-brand-primary-300
            data-[active=true]:text-white
            
            transition-colors
            duration-300
            ease-linear
            rounded-full

            dark:text-brand-black-700
          "
          data-active={category.value === selectedCategory}
          on:click={() => handleFilterInsights(category.value)}
        >
          {category.name}
        </button>
      {/each}
    </div>
  </div>

  <section class="ws-container">
    {#if loading}
      <div class="py-20">
        <LoadingSpinner />
      </div>
    {/if}

    <div
      class="grid grid-cols-1 gap-5 gap-y-10 py-16 md:grid-cols-2 sm:gap-7 sm:gap-y-12 sm:mt-24"
    >
      {#each filteredInsights as { content: insight, slug, name }, i}
        <InsightCard
          {insight}
          href={`/insights/${slug}`}
          title={name ?? ''}
          version={i % 2 === 0 ? 'one' : 'two'}
        />
      {/each}
    </div>
  </section>
</div>
