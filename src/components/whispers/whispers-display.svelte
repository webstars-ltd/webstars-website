<script lang="ts">
  import { onMount } from 'svelte';
  import type { Whisper } from '@lib/types';

  import WhisperCard from './whisper-card.svelte';
  import LoadingSpinner from '@components/shared/loading-spinner.svelte';

  async function loadWhispers() {
    loading = true;
    const url = ['/api/whispers'];
    const res = await fetch(url.join(''));

    if (res.ok) {
      const data = await res.json();
      loading = false;
      return data;
    } else {
      throw new Error('Error loading whispers');
    }
  }


  export let intro: string = '';

  let loading: boolean = true;
  let whispers: Whisper[] = [];

  // Carousel state
  let carouselRef: HTMLDivElement;
  let isAtStart: boolean = true;
  let isAtEnd: boolean = false;

  const SCROLL_AMOUNT = 624; // 600px card + 24px gap

  function handleScroll() {
    if (!carouselRef) return;

    const { scrollLeft, scrollWidth, clientWidth } = carouselRef;
    isAtStart = scrollLeft < 10;
    isAtEnd = scrollLeft + clientWidth >= scrollWidth - 10;
  }

  function scrollPrev() {
    if (!carouselRef) return;
    carouselRef.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
  }

  function scrollNext() {
    if (!carouselRef) return;
    carouselRef.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' });
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      scrollPrev();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      scrollNext();
    }
  }

  onMount(async () => {
    const whispersData = await loadWhispers();
    whispers = whispersData?.whispers;

    // Filter out current url if needed
    const currentUrl = window.location.pathname;
    
    whispers = whispers.filter(whisper => `/${whisper.full_slug}` !== currentUrl);
    
    loading = false;

    // Initialize scroll state after data loads
    setTimeout(() => handleScroll(), 0);
  });
</script>

<div class="pt-10" id="whispers-display-start">
  <section class="ws-container">
    {#if loading}
      <div class="py-20">
        <LoadingSpinner />
      </div>
    {:else if whispers.length > 0}
      <!-- Navigation Arrows -->
      <div class="flex {intro ? "justify-between" : "justify-end"} items-start mb-6 sm:mt-24">
        {#if intro}
          <p class="text-sm w-2/3 sm:w-4/5 text-brand-dark-500">
            {@html intro}
          </p>
        {/if}

        <div class="flex gap-2 items-center">
          <button
            class="
              w-10 h-10
              flex items-center justify-center
              rounded-full
              bg-brand-gray-100
              hover:bg-brand-primary-300
              hover:text-white
              disabled:opacity-40
              disabled:cursor-not-allowed
              disabled:hover:bg-brand-gray-100
              disabled:hover:text-inherit
              transition-colors
              duration-300
              ease-linear
              dark:text-brand-black-700
              dark:hover:text-white
            "
            aria-label="Previous whispers"
            disabled={isAtStart}
            on:click={scrollPrev}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              class="w-4 h-4"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
            </svg>
          </button>
          <button
            class="
              w-10 h-10
              flex items-center justify-center
              rounded-full
              bg-brand-gray-100
              hover:bg-brand-primary-300
              hover:text-white
              disabled:opacity-40
              disabled:cursor-not-allowed
              disabled:hover:bg-brand-gray-100
              disabled:hover:text-inherit
              transition-colors
              duration-300
              ease-linear
              dark:text-brand-black-700
              dark:hover:text-white
            "
            aria-label="Next whispers"
            disabled={isAtEnd}
            on:click={scrollNext}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              class="w-4 h-4"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Carousel Container -->
      <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <div
        class="
          overflow-x-auto
          snap-x
          snap-mandatory
          scrollbar-hide
          -mx-4
          px-4
          py-8
        "
        bind:this={carouselRef}
        on:scroll={handleScroll}
        role="region"
        aria-label="Whispers carousel"
        tabindex="0"
        on:keydown={handleKeydown}
      >
        <div class="flex gap-6">
          {#each whispers as { content: whisper, slug, name, updated_at: date }, i}
            <div class="snap-start flex-shrink-0 w-[calc(100vw-2rem)] sm:w-[500px] md:w-[600px]">
              <WhisperCard
                {whisper}
                href={`/webstars-whispers/${slug}`}
                title={name ?? ''}
                {date}
              />
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </section>
</div>

<style>
  /* Hide scrollbar for Chrome, Safari and Opera */
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
