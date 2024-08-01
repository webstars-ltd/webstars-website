<script lang="ts">
  import { onMount } from 'svelte';
  import type { Project } from '@lib/types';

  import ProjectCard from './project-card.svelte';
  import LoadingSpinner from '@components/shared/loading-spinner.svelte';

  async function loadProjects() {
    loading = true;
    const url = ['/api/projects'];
    const res = await fetch(url.join(''));

    if (res.ok) {
      const data = await res.json();
      loading = false;
      return data;
    } else {
      throw new Error('Error loading projects');
    }
  }

  let loading: boolean = true;
  let projects: Project[] = [];

  onMount(async () => {
    const projectData = await loadProjects();

    projects = projectData?.projects;
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

    <div class="flex flex-col py-16 gap-32">
      {#each projects as { content: project, slug, name }, i}
        <ProjectCard {project} href={`/projects/${slug}`} title={name ?? ''} />
      {/each}
    </div>
  </section>
</div>
