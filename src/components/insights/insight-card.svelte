<script lang="ts">
  import type { InsightContent } from '@lib/types';

  export let insight: InsightContent;
  export let href: string;
  export let title: string;
  export let version: 'one' | 'two' = 'one';
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
    <p class="space-x-2 px-8">
      {#each insight.categories as category}
        <span>#{category}</span>
      {/each}
    </p>
    <h2
      class="heading-2 font-[500] px-8 leading-10 {version === 'one'
        ? 'text-brand-secondary-900 dark:text-brand-primary-900'
        : 'text-brand-primary-900'}"
    >
      {insight.title ?? title}: {insight.tagline}
    </h2>
    <figure class="grow flex flex-col justify-end px-5">
      <img
        src={insight.featured_image?.filename}
        alt={insight.featured_image?.alt}
        class=""
      />
    </figure>
  </div>
</a>
