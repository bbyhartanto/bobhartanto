<script setup lang="ts">
// Fetch all portfolio entries
const { data: portfolioItems } = await useAsyncData('all-portfolio', () => {
  let q = queryCollection('portfolio')
  if (!import.meta.dev) {
    q = q.where('draft', '=', false)
  }
  return q.all()
})

useSeoMeta({
  title: 'Portfolio - Bobby Hartanto',
  description: 'A curated showcase of product design, visual systems, and interactive digital interfaces.'
})
</script>

<template>
  <div class="min-h-screen bg-[#F1F1F3] text-[#1A1A1A] font-sans pb-24">
    <HeaderChild label="Portfolio" max-width="w-full" bg-class="bg-[#F1F1F3]/80" />

    <!-- Main Grid Layout -->
    <div class="w-full px-5 pt-16 md:pt-24 animate-fade-in">
      <div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-[15px]">
        <!-- Column 3 to 8 on desktop (starts at column 3, spans 6) -->
        <div class="col-span-1 md:col-span-4 lg:col-start-3 lg:col-span-6 flex flex-col gap-8">
          <!-- Title & Description -->
          <div class="flex flex-col gap-4 mb-6">
            <span class="text-xs font-mono uppercase tracking-wider text-gray-500">Selected Works</span>
            <h1 class="text-4xl md:text-5xl font-medium text-black tracking-tight leading-none">
              Portfolio
            </h1>
            <p class="text-base text-gray-700 leading-relaxed font-light mt-2 max-w-2xl">
              Digital product experiences, tactile user interfaces, design architecture, and high-impact design workflows.
            </p>
          </div>

          <!-- Portfolio List -->
          <div class="portfolio-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 border-t border-black/10 pt-6">
            <template v-if="portfolioItems && portfolioItems.length > 0">
              <ThumbnailPortrait
                v-for="item in portfolioItems"
                :key="item.path"
                :case-study="item"
              />
            </template>
            <template v-else>
              <div class="col-span-full py-16 text-left">
                <p class="text-gray-500 font-mono">No portfolio items found.</p>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
