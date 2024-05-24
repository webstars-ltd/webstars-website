<script lang="ts">
  import type { ProjectContent } from '@lib/types';

  export let project: ProjectContent;
  export let href: string;
  export let title: string;
</script>

<a
  {href}
  class="
    project-card
    block
    bg-brand-secondary-100
    
    hover:text-inherit
    
    transition-all
    duration-300
    ease-linear
    
    has-card-hover-effect
    
    md:h-[460px]
    lg:mx-10
  "
>
  <div class="flex flex-col gap-4 h-full md:flex-row max-md:pt-12">
    <figure
      class="grid grid-cols-1 place-content-center md:w-1/2 max-md:min-h-[300px]"
    >
      <img
        src={project.featured_image?.filename}
        alt={project.featured_image?.alt}
        class=""
      />
    </figure>
    <div
      class="bg-brand-gray-100 pt-12 pb-8 space-y-5 max-md:min-h-[450px] md:w-1/2 dark:text-brand-black-700"
    >
      <p class="px-6 md:px-12">
        Case Study | {project.client}
      </p>
      <h2 class="heading-2 font-sans font-bold px-6 md:px-12 leading-10">
        {project.list_title ?? title}
      </h2>
    </div>
  </div>
</a>
