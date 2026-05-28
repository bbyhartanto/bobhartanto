<script setup lang="ts">
const route = useRoute()

// Fetch the case study from the 'casestudies' collection by its path
const { data: caseStudy } = await useAsyncData('casestudy-' + route.params.slug, () => {
  return queryCollection('casestudies').path(route.path).first()
})

if (!caseStudy.value) {
  throw createError({ statusCode: 404, statusMessage: 'Case Study not found', fatal: true })
}

// Compute active subcategories from checkboxes and backward compatibility
const activeSubcategories = computed(() => {
  if (!caseStudy.value) return []
  const list = []
  if (caseStudy.value.designThinking) list.push('Design Thinking')
  if (caseStudy.value.strategy) list.push('Strategy')
  if (caseStudy.value.uxResearch) list.push('UX Research')
  if (caseStudy.value.prototyping) list.push('Prototyping')
  
  // Backward compatibility support for old markdown files
  if (caseStudy.value.subcategory) {
    const sub = caseStudy.value.subcategory
    if (Array.isArray(sub)) {
      sub.forEach(s => { if (!list.includes(s)) list.push(s) })
    } else if (typeof sub === 'string' && !list.includes(sub)) {
      list.push(sub)
    }
  }
  return list
})
</script>

<template>
  <div class="min-h-screen bg-[#fafafa] text-[#111111] font-sans selection:bg-black selection:text-white pb-24">
    <!-- Top Nav / Back Button -->
    <div class="w-full sticky top-0 z-10 bg-[#fafafa]/80 backdrop-blur-md border-b border-black/10">
      <div class="max-w-4xl mx-auto px-6 py-5 flex justify-between items-center">
        <NuxtLink to="/" class="group flex items-center gap-2 text-sm font-medium text-black/75 hover:text-black transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-200">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </NuxtLink>
        <span class="text-xs uppercase tracking-wider font-mono text-black/45">Case Study</span>
      </div>
    </div>

    <!-- Main Container -->
    <div class="max-w-4xl mx-auto px-6 pt-16 md:pt-24 animate-fade-in">
      <header class="flex flex-col gap-6 mb-12">
        <!-- Category Badges -->
        <div class="flex flex-wrap gap-2.5 items-center">
          <span class="px-3.5 py-1 border border-black rounded-full text-xs font-medium tracking-tight uppercase bg-white">
            {{ caseStudy.category }}
          </span>
          <template v-if="activeSubcategories.length > 0">
            <span 
              v-for="sub in activeSubcategories" 
              :key="sub"
              class="px-3.5 py-1 border border-black/15 text-black/60 rounded-full text-xs font-normal tracking-tight uppercase bg-white/50"
            >
              {{ sub }}
            </span>
          </template>
        </div>

        <!-- Huge Title -->
        <h1 class="text-4xl md:text-6xl font-normal leading-[1.1] tracking-tight text-black font-sans mt-2">
          {{ caseStudy.title }}
        </h1>

        <!-- Description -->
        <p class="text-xl md:text-2xl font-light text-black/75 leading-relaxed max-w-3xl">
          {{ caseStudy.description }}
        </p>

        <!-- Dynamic Metadata Row -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 my-4 border-y border-black/10 text-sm">
          <div v-if="caseStudy.role || 'Product Design Lead'">
            <span class="block text-black/45 font-mono text-xs uppercase mb-1">Role</span>
            <span class="font-medium text-black">{{ caseStudy.role || 'Product Design Lead' }}</span>
          </div>
          <div v-if="caseStudy.timeline || '2026'">
            <span class="block text-black/45 font-mono text-xs uppercase mb-1">Timeline</span>
            <span class="font-medium text-black">{{ caseStudy.timeline || '2026' }}</span>
          </div>
          <div v-if="caseStudy.platform || 'Web & Mobile'">
            <span class="block text-black/45 font-mono text-xs uppercase mb-1">Platform</span>
            <span class="font-medium text-black">{{ caseStudy.platform || 'Web & Mobile' }}</span>
          </div>
          <div v-if="caseStudy.focus || 'Strategy & Research'">
            <span class="block text-black/45 font-mono text-xs uppercase mb-1">Focus</span>
            <span class="font-medium text-black">{{ caseStudy.focus || 'Strategy & Research' }}</span>
          </div>
        </div>
      </header>

      <!-- Markdown Prose Content -->
      <article class="prose prose-neutral max-w-none text-black/85">
        <ContentRenderer :value="caseStudy" />
      </article>
    </div>
  </div>
</template>

<style scoped>
/* High-end custom typography style overrides for markdown rendering */
:deep(h1) {
  font-size: 2.25rem;
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1.25;
  color: #000000;
}

:deep(h2) {
  font-size: 1.75rem;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.3;
  color: #000000;
}

:deep(p) {
  font-size: 1.125rem;
  line-height: 1.8;
  color: #222222;
  margin-bottom: 1.5rem;
  font-weight: 300;
}

:deep(ul) {
  list-style-type: disc;
  margin-bottom: 1.75rem;
  padding-left: 1.5rem;
}

:deep(ol) {
  list-style-type: decimal;
  margin-bottom: 1.75rem;
  padding-left: 1.5rem;
}

:deep(li) {
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
  line-height: 1.8;
  color: #222222;
  font-weight: 300;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}
</style>
