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
    whisper-card
    h-[400px]
    block
    p-8

    dark:text-brand-primary-900
  "
>
  <div class="flex flex-col sm:flex-row gap-4 h-full">
    <div class="sm:w-1/3 space-y-2">
      <h2
        class="heading-3 font-[500] leading-10"
      >
        Webstars Whisper: <br /> {whisper.title ?? title}
      </h2>
      <time datetime={date}>
        {format(new Date(date ?? ''), 'MMMM do, yyy')}
      </time>
    </div>

    <div class="sm:w-2/3">
      <p>{whisper.intro}</p>
    </div>
  </div>
</a>
