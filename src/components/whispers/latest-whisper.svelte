<script lang="ts">
  import { onMount } from 'svelte';
  import { format } from 'date-fns';
  import { renderRichText } from "@storyblok/svelte";
  import type { Whisper } from '@lib/types';

  import WhisperCard from './whisper-card.svelte';
  import LoadingSpinner from '@components/shared/loading-spinner.svelte';

  let loading: boolean = true;
  let whisper: Whisper | null = null;
  let whisperDate: string = '';
  let whisperContent: unknown | null = null;
  
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

  onMount(async () => {
    const whispersData = await loadWhispers();
    const whisperObj = whispersData?.whispers?.[0] ?? null;
    whisper = whisperObj.content;
    whisperDate = whisperObj?.published_at ?? whisperObj?.created_at ?? '';
    whisperContent = renderRichText(whisperObj.content.content);

    loading = false;
  });
</script>


{#if loading}

  <div class="py-20">
    <LoadingSpinner />
  </div>

{:else if whisper}
  
  <section class="mt-20 mb-4">
    <header class="pb-16 max-sm:my-28">
      <div class="ws-container">
        <h2
          class="text-center text-4xl leading-loose font-sans font-semibold"
        >
          {whisper.title}
        </h2>
        <p
          class="text-center tagline font-medium leading-normal text-3xl font-bitter text-brand-secondary-900 dark:text-brand-primary-900"
        >
          {whisper.tagline}
        </p>
      </div>
    </header>

    <!-- Project information -->
    <section class="ws-container">
      <div
        class="grid grid-cols-1 gap-6 md:gap-8 max-sm:px-4 lg:px-10"
      >
        {#if whisper.author_byline}
          <div class="flex flex-row gap-3 justify-center items-center font-bitter">
            <p class="font-[900] dark:text-brand-primary-900">{whisper.author_byline}</p>
            <time datetime={whisperDate}>
              {format(new Date(whisperDate ?? ''), 'MMMM do, yyyy')}
            </time>
          </div>
        {/if}
          
        {#if whisperContent}
          <div
            class="insight-content prose font-bitter max-w-none dark:text-white"
          >
            {@html whisperContent}
          </div>
        {/if}
      </div>
    </section>
  </section>

{/if}