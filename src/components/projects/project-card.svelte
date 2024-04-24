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
    h-[460px]
    mx-10
    block
    bg-brand-secondary-100

    hover:text-inherit

    transition-all
    duration-300
    ease-linear

    has-card-hover-effect
  "
>
  <div class="flex flex-col gap-4 h-full sm:flex-row">
    <figure class="grid grid-cols-1 place-content-center sm:w-1/2">
      <img
        src={project.featured_image?.filename}
        alt={project.featured_image?.alt}
        class=""
      />
    </figure>
    <div class="bg-brand-gray-100 pt-12 pb-8 space-y-5 sm:w-1/2">
      <p class="px-12">
        Case Study | {project.client}
      </p>
      <h2 class="heading-2 font-sans font-bold px-12 leading-10">
        {project.list_title ?? title}
      </h2>
    </div>
  </div>
</a>
