<script lang="ts">
  import { format } from 'date-fns';
  import type { WhisperContent } from '@lib/types';

  export let whisper: WhisperContent;
  export let href: string;
  export let title: string;
  export let date: string;
</script>

<a
  {href}
  class="
    insight-card
    min-h-[300px]
    block
    bg-brand-secondary-100
    text-brand-secondary-900
    p-8

    hover:text-brand-secondary-900

    transition-all
    duration-300
    ease-linear

    has-card-hover-effect

    dark:text-brand-primary-900
  "
>
  <div class="flex flex-col gap-4 h-full">
    <p class="flex flex-row flex-wrap gap-1">
      {#if whisper.author_byline}
        <span>{whisper.author_byline}</span>,
      {/if}
      <time datetime={date}>
        {format(new Date(date ?? ''), 'MMMM do, yyy')}
      </time>
    </p>
    <h2
      class="heading-2 font-[500] leading-10 text-brand-secondary-900 dark:text-brand-primary-900"
    >
      {title}
    </h2>
    <p class="">
      {whisper.intro}
    </p>
  </div>
</a>
